<template>
  <span v-el:trigger v-on:click="void(0)"><slot></slot></span><!--
  --><div v-el:popover v-if="show" style="display:block;"
    :class="['tooltip',placement]"
    :transition="effect"
  >
    <div class="tooltip-arrow"></div>
    <div class="tooltip-inner" v-on:click="void(0)">
      <slot name="content">{{{contentRendered}}}</slot>
   </div>
  </div>
</template>

<script>
import PopoverMixin from './utils/popoverMixins.js'
import md from './utils/markdown.js'

export default {
  mixins: [PopoverMixin],
  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    effect: {
      type: String,
      default: 'scale'
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  events: {
    'trigger:bind': function (el, id) {
      if (id === this.id) {
        el.setTriggerBy(this)
        this.setTrigger(el) // rebind events
      }
    }
  },
  attached () {
    this.$els.trigger.style['-webkit-text-decoration'] = 'underline dotted'
    this.$els.trigger.style['text-decoration'] = 'underline dotted'
  }
}
</script>

<style>
.tooltip.top,
.tooltip.left,
.tooltip.right,
.tooltip.bottom {
  opacity: .9
}
.fadein-enter {
  animation:fadein-in 0.3s ease-in;
}
.fadein-leave {
  animation:fadein-out 0.3s ease-out;
}
@keyframes fadein-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: .9;
  }
}
@keyframes fadein-out {
  0% {
    opacity: .9;
  }
  100% {
    opacity: 0;
  }
}
</style>
