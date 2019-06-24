<template>
  <span :class="[addClass]">
    <span ref="trigger" v-if="hasSlot"><slot></slot></span><!--
    -->
    <transition :name="effect">
    <div ref="popover" v-if="show"
      :class="['popover', popoverPlacementClass]">
      <div class="arrow" ref="arrow"></div>
      <h3 class="popover-header" v-if="title">
        <slot name="title" v-if="hasTitleSlot"></slot>
        <span v-else v-html="titleRendered"></span>
      </h3>
      <div class="popover-body">
        <slot name="content" v-if="hasContentSlot"></slot>
        <span v-else v-html="contentRendered"></span>
      </div>
    </div>
    </transition>
  </span>
</template>

<script>
import PopoverMixin from './utils/popoverMixins.js'

export default {
  mixins: [PopoverMixin],
  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    addClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    hasSlot () {
      return this.$slots.default;
    },
    hasTitleSlot () {
      return this.$slots.title
    },
    hasContentSlot () {
      return this.$slots.content;
    },
    popoverPlacementClass() {
      return `bs-popover-${this.placement}`;
    }
  },
  mounted () {
    if (this.$refs.trigger) {
      this.$refs.trigger.style['-webkit-text-decoration'] = 'underline dotted'
      this.$refs.trigger.style['text-decoration'] = 'underline dotted'
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

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
.scale-enter-active {
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
