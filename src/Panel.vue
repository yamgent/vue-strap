<template>
    <span class="card-container">
        <div class="morph" v-show="localMinimized">
            <button :class="['morph-display-wrapper', 'btn', btnType, 'card-title']" @click="open()">
                <template v-if="altContent">
                    <div  v-html="altContent"></div>
                </template>
                <template v-else>
                    <slot name="header">
                        <div v-html="altContent"></div>
                    </slot>
                </template>
            </button>
        </div>
        <div :class="['card', {'expandable-card': isExpandableCard}, borderType]" v-show="!localMinimized">
            <div :class="['card-header',{'accordion-toggle':canCollapse}, cardType, borderType]"
                 @click.prevent.stop="canCollapse && toggle()"
                 @mouseover="onHeaderHover = true" @mouseleave="onHeaderHover = false">
                <div class="header-wrapper">
                    <span :class="['glyphicon', localExpanded ? 'glyphicon-chevron-down' : 'glyphicon-chevron-right']" v-show="showCaret"></span>
                    <slot name="header">
                        <div :class="['card-title', cardType, {'text-white':!isLightBg}]" v-html="headerContent"></div>
                    </slot>
                </div>
                <div class="button-wrapper">
                    <slot name="button">
                        <panel-switch v-show="canCollapse && !noSwitchBool && !showCaret" v-bind:is-open="localExpanded"
                                      @click.native.stop.prevent="expand()"
                                      @is-open-event="retrieveOnOpen" v-bind:is-light-bg="isLightBg"></panel-switch>
                        <button type="button" :class="['close-button', 'btn', isLightBg ? 'btn-outline-secondary' : 'btn-outline-light']"
                                v-show="!isSeamless ? (!noCloseBool) : onHeaderHover"
                                @click.stop="close()">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </button>
                        <button type="button" :class="['popup-button', 'btn', isLightBg ? 'btn-outline-secondary' : 'btn-outline-light']"
                                v-show="this.popupUrl !== null"
                                @click.stop="openPopup()">
                            <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>
                        </button>
                    </slot>
                </div>
            </div>
            <div class="card-collapse"
                 ref="panel"
                 v-show="localExpanded"
            >
                <div class="card-body">
                    <slot></slot>
                    <retriever v-if="isDynamic" ref="retriever" :src="src" :fragment="fragment" delay></retriever>
                    <panel-switch v-show="canCollapse && bottomSwitchBool" v-bind:is-open="localExpanded"
                                  @click.native.stop.prevent="collapseThenScrollIntoViewIfNeeded()"
                                  @is-open-event="retrieveOnOpen"></panel-switch>
                </div>
                <hr v-show="isSeamless" />
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
      isExpandableCard () {
        return this.expandableBool;
      },
      canCollapse () {
        return this.inAccordion || this.expandableBool;
      },
      showCaret () {
        return this.isSeamless;
      },
      isSeamless () {
        return this.type === 'seamless';
      },
      btnType () {
        if (this.isSeamless) {
          return 'btn-outline-secondary';
        } else {
          return 'btn-outline-' + (this.type || 'secondary');
        }
      },
      borderType () {
        if (this.isSeamless) {
          return 'border-0';
        } else if (this.type) {
          return 'border-' + this.type;
        }
        else '';
      },
      cardType () {
        if (this.isSeamless) {
          return 'bg-white';
        } else {
          return 'bg-' + (this.type || 'light');
        }
      },
      isLightBg() {
        return this.cardType === 'bg-light' || this.cardType === 'bg-white';
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
        if (!this.isSeamless) {
          return !this.noCloseBool;
        } else {
          return onHeaderHover;
        }
      }
    },
    data () {
      return {
        onHeaderHover: false,
        localExpanded: false,
        localMinimized: false
      }
    },
    methods: {
      toggle() {
        this.localExpanded = !this.localExpanded;
      },
      expand() {
        this.localExpanded = !this.localExpanded;
      },
      close() {
        this.localMinimized = true;
      },
      open() {
        this.localExpanded = true;
        this.localMinimized = false;
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
      'localExpanded': function (val, oldVal) {
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
      // Edge case where user might want non-expandable card that isn't expanded by default
      const notExpandableNoExpand = !this.expandableBool && this.expanded !== 'false';
      // Set local data to computed prop value
      this.localExpanded =  notExpandableNoExpand || this.expandedBool; // Ensure this expr ordering is maintained
      this.localMinimized = this.minimizedBool;
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
    .card-heading {
        width: 100%;
    }

    .card-title {
        display: inline-block;
        font-size: 1em;
        margin: 0;
        vertical-align: middle;
    }

    .card-title * {
        margin: 0px !important;
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

    .expandable-card {
        margin-bottom: 0 !important;
        margin-top: 5px;
    }

    .card-group > .card-container > .expandable-card {
        margin-top: 0!important;
    }

    .card-seamless {
        padding: 0;
    }

    .card.card-seamless {
        box-shadow: none;
        border: none;
    }

    .card-seamless > .card-heading {
        padding: 0;
    }

    .card-seamless > .card-collapse > hr {
        margin: 0;
        width: calc(100% - 27px);
    }

    .card-seamless > .card-collapse > .card-body {
        padding: 10px 0;
    }

    .card-seamless > .card-collapse > .card-body > .collapse-button {
        position: relative;
        top: 22px;
    }

    .card-body > .collapse-button {
        margin-top: 5px;
        opacity: 0.2;
    }

    .card-body > .collapse-button:hover {
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
