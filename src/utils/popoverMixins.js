import {toBoolean} from './utils.js'
import $ from './NodeList.js'
import {globalEventBus} from '../GlobalEventBus.js'
import md from './markdown.js'

function getFirst(nodeList) {
  return nodeList && (nodeList.length ? nodeList[0] : nodeList)
}

function getFirstChild(node) {
  return node && (node.children.length ? node.children[0] : node)
}

export default {
  props: {
    trigger: {
      type: String
    },
    effect: {
      type: String,
      default: 'fade'
    },
    title: {
      type: String
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
      position: {
        top: 0,
        left: 0
      },
      isPopover: false,
      show: false
    }
  },
  computed: {
    contentRendered () {
      return md.renderInline(this.content)
    },
    titleRendered () {
      return md.renderInline(this.title)
    }
  },
  methods: {
    bindTrigger (trigger, popover) {
      if (popover === this.id) {
        trigger.setTriggerBy(this)
      }
    },
    toggle (e) {
      let trigger = getFirstChild(this.$refs.trigger)
      if (e && this.trigger === 'contextmenu' && trigger === e.target) e.preventDefault()
      if (!(this.show = !this.show)) {
        return
      }
      if (e) {
        let target = e.target
        if (trigger !== target && getFirst(this._trigger) !== target) {
          // Multiple triggers share this popover
          trigger = getFirstChild(target)
        }
      }
      setTimeout(() => {
        const popover = this.$refs.popover
        this.isPopover = Array.some(popover.classList, classname => classname === 'popover');
        trigger.offsetParent.style.position = 'relative';
        popover.style.position = 'absolute';
        this.calculateOffset(trigger, popover)
        this.keepPopoverWithinScreen(popover);
        popover.style.top = this.position.top + 'px'
        popover.style.left = this.position.left + 'px'
        if (this.$refs.arrow) {
          let isVertical = /top|bottom/.test(this.placement);
          this.adjustArrow(isVertical)
        }
      }, 20)
    },
    calculateTriggerBoundingBox(trigger) {
      const triggerClientRects = trigger.getClientRects();
      if (!triggerClientRects || triggerClientRects.length === 0) {
        return {
          left: trigger.offsetLeft,
          top: trigger.offsetTop,
          right: trigger.offsetLeft + trigger.offsetWidth,
          bottom: trigger.offsetTop + trigger.offsetHeight
        };
      }

      let triggerBoundingBox = {
        left: triggerClientRects[0].left,
        top: triggerClientRects[0].top,
        right: triggerClientRects[0].right,
        bottom: triggerClientRects[0].bottom
      };

      var i;
      for (i = 1; i < triggerClientRects.length; i++) {
        triggerBoundingBox.left = Math.min(triggerBoundingBox.left, triggerClientRects[i].left);
        triggerBoundingBox.top = Math.min(triggerBoundingBox.top, triggerClientRects[i].top);
        triggerBoundingBox.right = Math.max(triggerBoundingBox.right, triggerClientRects[i].right);
        triggerBoundingBox.bottom = Math.max(triggerBoundingBox.bottom, triggerClientRects[i].bottom);
      }

      return triggerBoundingBox;
    },
    getViewportOffset() {
      const vueViewportRect = this._viewport.getBoundingClientRect();
      return {
        left: -vueViewportRect.left,
        right: -vueViewportRect.left + vueViewportRect.width,
        top: -vueViewportRect.top,
        bottom: -vueViewportRect.top + vueViewportRect.height,
      };
    },
    calculateOffset (trigger, popover) {
      const triggerBoundingBox = this.calculateTriggerBoundingBox(trigger);
      const viewportOffset = this.getViewportOffset();
      triggerBoundingBox.left += viewportOffset.left;
      triggerBoundingBox.right += viewportOffset.left;
      triggerBoundingBox.top += viewportOffset.top;
      triggerBoundingBox.bottom += viewportOffset.top;

      switch (this.placement) {
        case 'top' :
          this.position.left = ((triggerBoundingBox.left + triggerBoundingBox.right) / 2)
            - (popover.offsetWidth / 2);
          this.position.top = triggerBoundingBox.top - popover.offsetHeight;
          if (this.isPopover) {
            this.position.top -= this.$refs.arrow.offsetHeight;
          }
          break
        case 'left':
          this.position.left = triggerBoundingBox.left - popover.offsetWidth;
          this.position.top = ((triggerBoundingBox.top + triggerBoundingBox.bottom) / 2)
            - (popover.offsetHeight / 2);
          if (this.isPopover) {
            this.position.left -= this.$refs.arrow.offsetWidth;
          }
          break
        case 'right':
          this.position.left = triggerBoundingBox.right;
          this.position.top = ((triggerBoundingBox.top + triggerBoundingBox.bottom) / 2)
            - (popover.offsetHeight / 2);
          break
        case 'bottom':
          this.position.left = ((triggerBoundingBox.left + triggerBoundingBox.right) / 2)
            - (popover.offsetWidth / 2);
          this.position.top = triggerBoundingBox.bottom;
          break
        default:
          console.warn('Wrong placement prop')
      }
    },
    keepPopoverWithinScreen(popover) {
      const viewportBoundingRect = this.getViewportOffset();

      if (this.position.left < viewportBoundingRect.left) {
        this.position.left = viewportBoundingRect.left;
      }
      if (this.position.left > viewportBoundingRect.right - popover.offsetWidth - 5) {
        this.position.left = viewportBoundingRect.right - popover.offsetWidth - 5;
      }
      if (this.position.top < viewportBoundingRect.top) {
        this.position.top = viewportBoundingRect.top;
      }
      if (this.position.top > viewportBoundingRect.bottom - popover.offsetHeight) {
        this.position.top = viewportBoundingRect.bottom - popover.offsetHeight;
      }
    },
    adjustArrow (isVertical) {
      this.$refs.arrow.style[isVertical ? 'left' : 'top'] = '50%';
      this.$refs.arrow.style[isVertical ? 'top' : 'left'] = '';
      const translateLeft = (this.placement === 'top' || this.placement === 'bottom') ? -50 : 0;
      const translateTop = (this.placement === 'left' || this.placement === 'right') ? -50 : 0;
      this.$refs.arrow.style['transform'] = `translate(${translateLeft}%, ${translateTop}%)`;
    }
  },
  created () {
    globalEventBus.$on('trigger:bind', this.bindTrigger)
  },
  mounted () {
    let trigger = this.$refs.trigger
    this._viewport = document.body
    if (!trigger) return
    if (this.trigger === 'focus' && !~trigger.tabIndex) {
      trigger = $('a,input,select,textarea,button', trigger)
      if (!trigger.length) {
        trigger = null
      }
    }
    if (trigger) {
      let events = {contextmenu: 'contextmenu', hover: 'mouseleave mouseenter', focus: 'blur focus'}
      $(trigger).on(events[this.trigger] || 'click', this.toggle)
      this._trigger = trigger
    }
  },
  beforeDestroy () {
    globalEventBus.$off('trigger:bind', this.bindTrigger)
  }
}
