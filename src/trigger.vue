<template>
    <span v-el:trigger><slot></slot></span>
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

      this.$els.trigger.style['border-bottom'] = (this.trigger === 'click') ? '1px dashed #333' : '1px dotted #333'
      this.$els.trigger.style['padding-bottom'] = '2px'
      if (this.trigger === 'click') {
        this.$els.trigger.style['cursor'] = 'pointer'
      }
    },
    methods: {
      setTriggerBy (vm) {
        this._triggerBy = vm
      }
    }
  }
</script>

<style>

</style>
