<template>
  <transition name="fade">
    <div role="tabpanel" class="tab-pane active" v-show="show"
      :class="{hide:!show}"
    >
      <slot></slot>
      <hr />
    </div>
  </transition>
</template>

<script>
import {toBoolean} from './utils/utils.js'
import md from './utils/markdown.js'

export default {
  props: {
    header: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    headerRendered () {
      return md.renderInline(this.header)
    },
    active () {
      return this._tabset.show === this
    },
    index () {
      return this._tabset.tabs.indexOf(this)
    },
    show () {
      return this._tabset && this._tabset.show === this
    },
    transition () {
      return this._tabset ? this._tabset.effect : null
    },
    disabledBool () {
      return toBoolean(this.disabled)
    }
  },
  created () {
    this._ingroup = this.$parent && this.$parent._tabgroup
    let tabset = this
    while (tabset && tabset._tabset!==true && tabset.$parent) {
      tabset = tabset.$parent
    }
    if (!tabset._tabset) {
      this._tabset = {}
      console.warn('Warning: "tab" depend on "tabset" to work properly.')
    } else {
      tabset.tabs.push(this)
      if (!this._ingroup) {
        tabset.headers.push(this)
      } else {
        if (!~tabset.headers.indexOf(this.$parent)) {
          tabset.headers.push(this.$parent)
        }
      }
      this._tabset = tabset
    }
    if (this._ingroup) {
      this.$parent.tabs.push(this)
    }
  },
  beforeDestroy () {
    if (this._tabset.active === this.index) { this._tabset.active = 0 }
    if (this._ingroup) {
      var index = parent.tabs.indexOf(this);
      parent.tabs.splice(index, 1)
    }
    var index = this._tabset.tabs.indexOf(this);
    this._tabset.tabs.splice(index, 1)
  }
}
</script>
<style>
    .tab-pane > hr {
        margin: 0;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
</style>
