<template>
    <span v-el:trigger>
        <slot></slot>
    </span>
</template>

<script>
  export default {
    props: {
      trigger: {
        type: String,
        default: 'hover'
      },
      for: {
        type: String
      },
      _triggerBy: {
        type: Object
      }
    },
    attached () {
      let events = {contextmenu: 'contextmenu', hover: 'mouseleave mouseenter', focus: 'blur focus'}
      jQuery(this.$el).on(events[this.trigger] || 'click', () => {
        if (!this._triggerBy) {
          this.$dispatch('trigger:register', this, this.for)
          this._triggerBy && this._triggerBy.toggle()
        }
      })

      this.isPureText && (this.$els.trigger.style['border-bottom'] = '1px dotted black')
    },
    methods: {
      setTriggerBy (vm) {
        this._triggerBy = vm
      }
    },
    computed: {
      isPureText () {
        return this.$els.trigger.children.length === 0
      }
    }
  }
</script>

<style>

</style>
