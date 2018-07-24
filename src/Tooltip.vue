<template>
  <span>
    <b-tooltip :target="targetId" :triggers="trigger" :placement="placement" ref="tooltip">
      <span v-html="contentRendered"></span>
    </b-tooltip>
    <span :id="targetId" ref="trigger"><slot></slot></span>
  </span>
</template>

<script>
import md from './utils/markdown.js'
import {globalEventBus} from './GlobalEventBus.js'

export default {
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
    },
    content: {
      type: String
    },
    placement: {
      type: String,
      default: 'top'
    },
    id: {
      type: String
    }
  },
  data () {
    return {
      show: false,
      targetId: null
    }
  },
  methods: {
    bindTrigger (trigger, popover) {
      if (popover === this.id) {
        trigger.setTriggerBy(this)
      }
    },
  },
  computed: {
    contentRendered () {
      return md.renderInline(this.content)
    },
    toggle (e) {
      this.show = !this.show;
      this.$refs.tooltip.$emit(this.show ? 'open' : 'close');
    }
  },
  created () {
    globalEventBus.$on('trigger:bind', this.bindTrigger)
  },
  beforeDestroy () {
    globalEventBus.$off('trigger:bind', this.bindTrigger)
  },
  mounted () {
    this.targetId = `tooltip_${this._uid}`;
    if (this.$refs.trigger) {
      this.$refs.trigger.style['-webkit-text-decoration'] = 'underline dotted'
      this.$refs.trigger.style['text-decoration'] = 'underline dotted'
    }
  }
}
</script>
