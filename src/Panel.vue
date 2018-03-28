<template>
    <span class="panel-container">
        <div class="morph" v-show="minimized">
            <div class="morph-display-wrapper" v-on:click="open()">
                <button class="morph-display-button btn btn-default">
                    <template v-if="altContent">
                        <span class="panel-title">{{{altContent}}}</span>
                    </template>
                    <template v-else>
                        <slot name="header">
                            <span class="panel-title">{{{altContent}}}</span>
                        </slot>
                    </template>
                </button>
            </div>
        </div>

        <div :class="['panel', panelType, {'expandable-panel': isExpandablePanel}]" v-else>
            <div :class="['panel-heading',{'accordion-toggle':canCollapse}]"
                 @click.prevent.stop="canCollapse && toggle()"
                 @mouseover="onHeaderHover = true" @mouseleave="onHeaderHover = false">
                <div class="header-wrapper">
                    <span :class="['caret', {'caret-collapse': !expanded}]" v-show="showCaret"></span>
                    <slot name="header">
                        <div class="panel-title">{{{headerContent}}}</div>
                    </slot>
                </div>
                <div class="button-wrapper">
                    <slot name="button">
                        <panel-switch v-show="canCollapse && !noSwitch && !showCaret" v-bind:is-open="expanded"
                                      @click.stop.prevent="expand()"></panel-switch>
                        <button type="button" class="close-button btn btn-default"
                                v-show="this.type !== 'seamless' ? (!noClose) : onHeaderHover"
                                @click.stop="close()">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </button>
                    </slot>
                </div>
            </div>
            <div class="panel-collapse"
                 v-el:panel
                 v-show="expanded"
            >
                <div class="panel-body">
                    <slot></slot>
                    <retriever v-if="isDynamic" v-ref:retriever :src="src" :fragment="fragment" delay></retriever>
                    <panel-switch v-show="canCollapse && bottomSwitch" v-bind:is-open="expanded"
                                  @click.stop.prevent="collapseThenScrollIntoViewIfNeeded()"></panel-switch>
                </div>
            </div>
        </div>
    </span>
</template>

<script>
  import {coerce, getFragmentByHash} from './utils/utils.js'
  import md from './utils/markdown.js'
  import panelSwitch from './PanelSwitch.vue'
  import retriever from './Retriever.vue'

  export default {
    components: {
      panelSwitch,
      retriever
    },
    props: {
      header: {
        type: String
      },
      alt: {
        type: String
      },
      type: {
        type: String,
        default: null
      },
      expandable: {
        type: Boolean,
        coerce: coerce.boolean,
        default: true
      },
      isOpen: {
        type: Boolean,
        coerce: coerce.boolean,
        default: null
      },
      expanded: {
        type: Boolean,
        coerce: coerce.boolean,
        default: null
      },
      minimized: {
        type: Boolean,
        coerce: coerce.boolean,
        default: false
      },
      ctrlLvl: {
        type: Number,
        coerce: coerce.number,
        default: 0
      },
      noSwitch: {
        type: Boolean,
        coerce: coerce.boolean,
        default: false
      },
      noClose: {
        type: Boolean,
        coerce: coerce.boolean,
        default: false
      },
      src: {
        type: String
      },
      bottomSwitch: {
        type: Boolean,
        coerce: coerce.boolean,
        default: true
      }
    },
    data () {
      return {
        onHeaderHover: false
      }
    },
    computed: {
      inAccordion () {
        return this.$parent && this.$parent._isAccordion
      },
      isExpandablePanel () {
        return this.expandable;
      },
      canCollapse () {
        return this.inAccordion || this.expandable
      },
      showCaret () {
        return this.type == 'seamless';
      },
      panelType () {
        return 'panel panel-' + (this.type || (this.inAccordion && this.$parent.type) || 'default')
      },
      headerContent () {
        return md.render(this.header);
      },
      altContent () {
        return this.alt && md.renderInline(this.alt) || md.renderInline(this.header);
      },
      isDynamic () {
        return this.src && this.src.length > 0;
      },
      showCloseButton () {
        if (this.type !== 'seamless') {
          return !this.noClose;
        } else {
          return onHeaderHover;
        }
      }
    },
    methods: {
      toggle () {
        this.expanded = !this.expanded
      },
      expand() {
        if (this.expanded) {
          // Ask children to collapse
          this.$broadcast('panel:collapse', this.ctrlLvl)
        } else {
          // Expand children
          this.$broadcast('panel:expand', this.ctrlLvl)
        }
        this.expanded = !this.expanded
      },
      close() {
        console.log('close')
        this.minimized = true;
      },
      open () {
        this.minimized = false;
      },
      expandCollapseHandler (isExpand, level) {
        if (level > 0) {
          this.canCollapse && (this.expanded = isExpand)
          this.$broadcast('panel:' + (isExpand ? 'expand' : 'collapse'), level - 1)
        } else if (level === -1) {
          this.canCollapse && (this.expanded = isExpand)
          this.$broadcast('panel:' + (isExpand ? 'expand' : 'collapse'), -1)
        }
      },
      scrollIntoViewIfNeeded() {
        var top = this.$el.getBoundingClientRect().top;
        var isTopInView = (top >= 0) && (top <= window.innerHeight);
        if (!isTopInView) {
          this.$el.scrollIntoView();
        }
      },
      collapseThenScrollIntoViewIfNeeded() {
        this.$once('isOpenEvent', (el, isOpen) => {
          this.scrollIntoViewIfNeeded();
        });
        this.expand();
      }
    },
    watch: {
      'expanded': function (val, oldVal) {
        this.$dispatch('isOpenEvent', this, val)
      }
    },
    events: {
      'panel:expand': function (level) {
        this.expandCollapseHandler(true, level)
      },
      'panel:collapse': function (level) {
        this.expandCollapseHandler(false, level)
      }
    },
    created () {
      if (this.expanded === null) {
        this.expanded = !this.canCollapse
      }
      if (this.src) {
        var hash = getFragmentByHash(this.src)
        if (hash) {
          this.fragment = hash
          this.src = this.src.split('#')[0]
        }
      }
    },
    attached() {
      if (this.isDynamic && this.expanded) {
        this.$refs.retriever.fetch()
      }

      this.$on('isOpenEvent', (el, isOpen) => {
        if (isOpen && this.isDynamic) {
          this.$refs.retriever.fetch()
        }
      })
    },
  }
</script>

<style>
    .panel-heading {
        width: 100%;
    }

    .panel-title {
        display: inline-block;
        font-size: 1em;
        vertical-align: middle;
    }

    .panel-title * {
        margin: 0px;
    }

    .header-wrapper {
        display: inline-block;
        width: 72%;
    }

    .button-wrapper {
        float: right;
        display: inline-block;
        width: 28%;
    }

    .accordion-toggle {
        cursor: pointer;
    }

    .expandable-panel {
        margin-bottom: 0 !important;
        margin-top: 5px;
    }

    .panel-group > .panel-container > .expandable-panel {
        margin-top: 0!important;
    }

    .panel-seamless {
        padding: 0;
    }

    .caret.caret-collapse {
        border-left: 4px dashed;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-right: none;
    }

    .panel.panel-seamless {
        box-shadow: none;
        border: none;
    }

    .panel-seamless > .panel-heading {
        padding: 0;
    }

    .panel-seamless > .panel-collapse > .panel-body {
        padding: 10px 0;
    }

    .panel-body > .collapse-button {
        margin-top: 5px;
        opacity: 0.2;
    }

    .panel-body > .collapse-button:hover {
        opacity: 1;
    }

    .close-button {
        font-size: 10px !important;
        float: right;
        padding: 3px 8px !important;
    }

    .morph {
        display: inline-block;
    }
</style>
