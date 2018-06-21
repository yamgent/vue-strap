<template>
    <span class="panel-container">
        <div class="morph" v-show="minimizedBool">
            <div class="morph-display-wrapper" @click="open()">
                <button class="morph-display-button btn btn-default">
                    <template v-if="altContent">
                        <div class="panel-title" v-html="altContent"></div>
                    </template>
                    <template v-else>
                        <slot name="header">
                            <div class="panel-title" v-html="altContent"></div>
                        </slot>
                    </template>
                </button>
            </div>
        </div>
        <div :class="['panel', panelType, {'expandable-panel': isExpandablePanel}]" v-show="!minimizedBool">
            <div :class="['panel-heading',{'accordion-toggle':canCollapse}]"
                 @click.prevent.stop="canCollapse && toggle()"
                 @mouseover="onHeaderHover = true" @mouseleave="onHeaderHover = false">
                <div class="header-wrapper">
                    <span :class="['caret', {'caret-collapse': !expandedBool}]" v-show="showCaret"></span>
                    <slot name="header">
                        <div class="panel-title" v-html="headerContent"></div>
                    </slot>
                </div>
                <div class="button-wrapper">
                    <slot name="button">
                        <panel-switch v-show="canCollapse && !noSwitchBool && !showCaret" v-bind:is-open="expandedBool"
                                      @click.native.stop.prevent="expand()"
                                      @is-open-event="retrieveOnOpen"></panel-switch>
                        <button type="button" class="close-button btn btn-default"
                                v-show="this.type !== 'seamless' ? (!noCloseBool) : onHeaderHover"
                                @click.stop="close()">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </button>
                        <button type="button" class="popup-button btn btn-default"
                                v-show="this.popupUrl !== null"
                                @click.stop="openPopup()">
                            <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>
                        </button>
                    </slot>
                </div>
            </div>
            <div class="panel-collapse"
                 ref="panel"
                 v-show="expandedBool"
            >
                <div class="panel-body">
                    <slot></slot>
                    <retriever v-if="isDynamic" ref="retriever" :src="src" :fragment="fragment" delay></retriever>
                    <panel-switch v-show="canCollapse && bottomSwitchBool" v-bind:is-open="expandedBool"
                                  @click.native.stop.prevent="collapseThenScrollIntoViewIfNeeded()"
                                  @is-open-event="retrieveOnOpen"></panel-switch>
                </div>
                <hr v-show="this.type === 'seamless'" />
            </div>
        </div>
    </span>
</template>

<script>
  import {getFragmentByHash, toBoolean, toNumber} from './utils/utils.js'
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
        type: String,
        default: ''
      },
      alt: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: null
      },
      expandable: {
        type: Boolean,
        default: true
      },
      isOpen: {
        type: Boolean,
        default: null
      },
      expanded: {
        type: Boolean,
        default: null
      },
      minimized: {
        type: Boolean,
        default: false
      },
      noSwitch: {
        type: Boolean,
        default: false
      },
      noClose: {
        type: Boolean,
        default: false
      },
      popupUrl: {
        type: String,
        default: null
      },
      src: {
        type: String
      },
      bottomSwitch: {
        type: Boolean,
        default: true
      },
      loadAll: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      // Vue 2.0 coerce migration
      expandableBool () {
        return toBoolean(this.expandable);
      },
      isOpenBool () {
        return toBoolean(this.isOpen);
      },
      expandedBool () {
        return toBoolean(this.expanded);
      },
      minimizedBool () {
        return toBoolean(this.minimized);
      },
      noSwitchBool () {
        return toBoolean(this.noSwitch);
      },
      noCloseBool () {
        return toBoolean(this.noClose);
      },
      bottomSwitchBool () {
        return toBoolean(this.bottomSwitch);
      },
      loadAllBool () {
        return toBoolean(this.loadAll);
      },
      // Vue 2.0 coerce migration end
      inAccordion () {
        return this.$parent && this.$parent._isAccordion;
      },
      isExpandablePanel () {
        return this.expandableBool;
      },
      canCollapse () {
        return this.inAccordion || this.expandableBool;
      },
      showCaret () {
        return this.type == 'seamless';
      },
      panelType () {
        return 'panel panel-' + (this.type || (this.inAccordion && this.$parent.type) || 'default');
      },
      headerContent () {
        return md.render(this.header);
      },
      altContent () {
        return this.alt && md.render(this.alt) || md.render(this.header);
      },
      isDynamic () {
        return this.src && this.src.length > 0;
      },
      showCloseButton () {
        if (this.type !== 'seamless') {
          return !this.noCloseBool;
        } else {
          return onHeaderHover;
        }
      }
    },
    data () {
      return {
        onHeaderHover: false,
      }
    },
    methods: {
      toggle() {
        this.expanded = !this.expandedBool;
      },
      expand() {
        this.expanded = !this.expandedBool;
      },
      close() {
        this.minimized = true;
      },
      open() {
        this.expanded = true;
        this.minimized = false;
      },
      scrollIntoViewIfNeeded() {
        let top = this.$el.getBoundingClientRect().top;
        let isTopInView = (top >= 0) && (top <= window.innerHeight);
        if (!isTopInView) {
          this.$el.scrollIntoView();
        }
      },
      collapseThenScrollIntoViewIfNeeded() {
        this.$once('is-open-event', (el, isOpen) => {
          this.scrollIntoViewIfNeeded();
        });
        this.expand();
      },
      openPopup() {
        window.open(this.popupUrl);
      },
      retrieveOnOpen(el, isOpen) {
        if (isOpen && this.isDynamic) {
          this.$refs.retriever.fetch()
        }
      }
    },
    watch: {
      'expanded': function (val, oldVal) {
        this.retrieveOnOpen(this, val);
      },
    },
    created () {
      if (this.src) {
        let hash = getFragmentByHash(this.src);
        if (hash) {
          this.fragment = hash;
          this.src = this.src.split('#')[0];
        }
      }
      // Edge case where user might want non-expandable panel that isn't expanded by default
      const notExpandableNoExpand = !this.expandableBool && this.expanded !== 'false';
      // Set prop data to computed prop value
      this.expanded =  notExpandableNoExpand || this.expandedBool; // Ensure this expr ordering is maintained
      this.minimized = this.minimizedBool;
    },
    mounted() {
      this.$nextTick(function () {
        if (this.isDynamic && (this.expandedBool || this.loadAllBool)) {
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

    .panel-seamless > .panel-collapse > hr {
        margin: 0;
        width: calc(100% - 27px);
    }

    .panel-seamless > .panel-collapse > .panel-body {
        padding: 10px 0;
    }

    .panel-seamless > .panel-collapse > .panel-body > .collapse-button {
        position: relative;
        top: 22px;
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

    .popup-button {
        font-size: 10px !important;
        float: right;
        padding: 3px 8px !important;
        margin-right: 4px;
    }

    .morph {
        display: inline-block;
    }
</style>
