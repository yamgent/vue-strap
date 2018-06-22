import {coerce} from './utils.js'
import $ from './NodeList.js'
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
    header: {
      type: Boolean,
      default: true
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
        console.log(trigger.offsetTop)
        console.log(popover.offsetHeight)
        this.calculateOffset(trigger, popover)
        this.updateOffsetForMargins(popover)
        popover.style.top = this.position.top + 'px'
        popover.style.left = this.position.left + 'px'
        if (this.$refs.arrow) {
          let actualWidth  = popover.offsetWidth
          let actualHeight = popover.offsetHeight
          this.calculateOffset(trigger, popover) // Update for CSS adjustment
          this.updateOffsetForMargins(popover)
          let delta = this.getViewportAdjustedDelta(this.position, actualWidth, actualHeight)
          if (delta.left) this.position.left += delta.left
          else this.position.top += delta.top
          popover.style.top = this.position.top + 'px'
          popover.style.left = this.position.left + 'px'
          let isVertical = /top|bottom/.test(this.placement)
          let arrowDelta = isVertical ? delta.left * 2 : delta.top * 2;
          let arrowOffsetPosition = isVertical ? popover.offsetWidth : popover.offsetHeight
          this.adjustArrow(arrowDelta, arrowOffsetPosition, isVertical)
        }
      }, 0)
    },
    calculateOffset (trigger, popover) {
      switch (this.placement) {
        case 'top' :
          this.position.left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2
          this.position.top = trigger.offsetTop - popover.offsetHeight
          break
        case 'left':
          this.position.left = trigger.offsetLeft - popover.offsetWidth
          this.position.top = trigger.offsetTop + trigger.offsetHeight / 2 - popover.offsetHeight / 2
          break
        case 'right':
          this.position.left = trigger.offsetLeft + trigger.offsetWidth
          this.position.top = trigger.offsetTop + trigger.offsetHeight / 2 - popover.offsetHeight / 2
          break
        case 'bottom':
          this.position.left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2
          this.position.top = trigger.offsetTop + trigger.offsetHeight
          break
        default:
          console.warn('Wrong placement prop')
      }
    },
    updateOffsetForMargins (popover) {
      const rect = popover.getBoundingClientRect()
      if (rect.left < 0) {
        this.position.left -= rect.left
        const marginLeft = parseInt(jQuery(popover).css('margin-left'), 10)
        if (marginLeft < 0) {
          this.position.left += marginLeft
          popover.style.marginLeft = 0
        }
      }
    },
    getViewportAdjustedDelta (pos, actualWidth, actualHeight) {
      var delta = { top: 0, left: 0 };
      let vpRect = this._viewport.getBoundingClientRect();
      let vpOffset = { top: 0, left: 0 };
      let scroll = {scroll: document.documentElement.scrollTop || document.body.scrollTop}
      let outerDims = { width: jQuery(window).width(), height: jQuery(window).height() };
      let viewportDimensions = Object.assign({}, vpRect, scroll, outerDims, vpOffset)

      if (/right|left/.test(this.placement)) {
        var topEdgeOffset    = pos.top - scroll
        var bottomEdgeOffset = pos.top - scroll + actualHeight
        if (topEdgeOffset < viewportDimensions.top) { // top overflow
          delta.top = viewportDimensions.top - topEdgeOffset
        } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
          delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
        }
      } else {
        var leftEdgeOffset  = pos.left
        var rightEdgeOffset = pos.left + actualWidth
        if (leftEdgeOffset < viewportDimensions.left) { // left overflow
          delta.left = viewportDimensions.left - leftEdgeOffset
        } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
          delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
        }
      }
      return delta
    },
    adjustArrow (delta, dimension, isVertical) {
      this.$refs.arrow.style[isVertical ? 'left' : 'top'] = 50 * (1 - delta / dimension) + '%'
      this.$refs.arrow.style[isVertical ? 'top' : 'left'] = ''
    }
  },
  mounted () {
    this.$nextTick(function() {
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
    });
  },
  beforeDestroy () {
    if (this._trigger) $(this._trigger).off()
  }
}
