<template>
  <span v-el:trigger v-if="hasSlot" v-on:click="void(0)"><slot></slot></span><!--
  --><div v-el:popover v-if="show"
    :class="['popover',placement]"
    :transition="effect"
  >
    <div class="arrow" v-el:arrow></div>
    <h3 class="popover-title" v-if="title" v-on:click="void(0)"><slot name="title">{{{titleRendered}}}</slot></h3>
    <div class="popover-content" v-on:click="void(0)"><slot name="content">{{{contentRendered}}}</slot></div>
  </div>
</template>

<script>
import PopoverMixin from './utils/popoverMixins.js'

export default {
  mixins: [PopoverMixin],
  props: {
    trigger: {
      type: String,
      default: 'hover'
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
  computed: {
    isPureText () {
      return this.$els.trigger.children.length === 0
    },
    hasSlot () {
      return this._slotContents !== void 0
    }
  },
  attached () {
    this.isPureText && (this.$els.trigger.style['border-bottom'] = '1px dotted black')
  }
}
</script>

<style>
.popover.top,
.popover.left,
.popover.right,
.popover.bottom {
  display: block;
  overflow-wrap: break-word;
}

@media (min-width: 768px) {
  .popover.top,
  .popover.left,
  .popover.right,
  .popover.bottom {
    max-width: 600px;
  }
}
.scale-enter {
  animation:scale-in 0.15s ease-in;
}
.scale-leave {
  animation:scale-out 0.15s ease-out;
}
@keyframes scale-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes scale-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
