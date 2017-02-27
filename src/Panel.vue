<template>
  <div :class="['panel', panelType, {'expandable-panel': isExpandablePanel}]">
    <div :class="['panel-heading',{'accordion-toggle':canCollapse}]"
         @click.prevent="canCollapse && toggle()">
      <div class="header-wrapper">
        <slot name="header">
          <div class="panel-title">{{{ header }}}</div>
        </slot>
      </div>
      <div class="button-wrapper">
        <slot name="button">
          <panel-switch v-show="canCollapse && !noSwitch" v-bind:is-open="isOpen" @click.stop="expand()"></panel-switch>
        </slot>
      </div>
    </div>
    <div class="panel-collapse"
      v-el:panel
      v-show="isOpen"
    >
      <div class="panel-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import {coerce} from './utils/utils.js'
import panelSwitch from './PanelSwitch.vue'

export default {
  components: {
    panelSwitch
  },
  props: {
    header: {
      type: String
    },
    isOpen: {
      type: Boolean,
      coerce: coerce.boolean,
      default: null
    },
    expandable: {
      type: Boolean,
      coerce: coerce.boolean,
      default: null
    },
    type: {
      type: String,
      default : null
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
    panelType () {
      return 'panel panel-' + (this.type || (this.$parent && this.$parent.type) || 'default')
    }
  },
  methods: {
    toggle () {
      this.isOpen = !this.isOpen
      this.$dispatch('isOpenEvent', this, this.isOpen)
    },
    expand() {
      if (this.isOpen) {
        // Ask children to collapse
        this.$broadcast('panel:collapse', this.ctrlLvl)
      } else {
        // Expand children
        this.$broadcast('panel:expand', this.ctrlLvl)
      }
      this.isOpen = !this.isOpen
    },
    expandCollapseHandler (isExpand, level) {
      if (level > 0) {
        this.canCollapse && (this.isOpen = isExpand)
        this.$broadcast('panel:' + (isExpand ? 'expand' : 'collapse'), level - 1)
      } else if (level === -1) {
        this.canCollapse && (this.isOpen = isExpand)
        this.$broadcast('panel:' + (isExpand ? 'expand' : 'collapse'), -1)
      }
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
    if (this.isOpen === null) {
      this.isOpen = !this.canCollapse
    }
  }
}
</script>

<style>
.panel-heading {
  width: 100%;
}
.panel-title {
  font-size: 1em;
  display: inline-block;
}
.header-wrapper {
  display: inline-block;
  width: 80%;
}
.button-wrapper {
  float: right;
  display: inline-block;
  width: 20%;
}
.accordion-toggle {
  cursor: pointer;
}
.expandable-panel {
  margin-bottom: 0;
}
.expandable-panel + .expandable-panel {
  margin-top: 5px;
}
</style>
