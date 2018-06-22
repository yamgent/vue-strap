<template>
  <div>
    <span ref="trigger" v-if="hasSlot" v-on:click="false"><slot></slot></span><!--
    --><div ref="popover" v-if="show"
      :class="['popover',placement]"
      :transition="effect"
    >
      <div class="arrow" ref="arrow"></div>
      <h3 class="popover-title" v-if="title" v-on:click="false"><slot name="title" v-html="titleRendered"></slot></h3>
      <div class="popover-content" v-on:click="false"><slot name="content" v-html="contentRendered"></slot></div>
    </div>
  </div>
</template>

<script>
import PopoverMixin from './utils/popoverMixins.js'
import {globalEventBus} from './GlobalEventBus.js'

export default {
  mixins: [PopoverMixin],
  props: {
    trigger: {
      type: String,
      default: 'hover'
    }
  },
  created () {
    const thisInstance = this
    globalEventBus.$on('trigger:bind', function(el, id) {
      if (id === thisInstance.id) {
        el.setTriggerBy(thisInstance)
      }
    });
  },
  computed: {
    hasSlot () {
      return this._slotContents !== void 0
    }
  },
  mounted () {
    this.$nextTick(function() {
      if (this.$refs.trigger) {
        this.$refs.trigger.style['-webkit-text-decoration'] = 'underline dotted'
        this.$refs.trigger.style['text-decoration'] = 'underline dotted'
      }
    });

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
.scale-leave-active {
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
