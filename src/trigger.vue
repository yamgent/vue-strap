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
      },
      _isBinded: {
        type: Boolean,
        default: false
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
        if (!this._isBinded) {
        let events = {contextmenu: 'contextmenu', hover: 'mouseleave mouseenter', focus: 'blur focus'}
          this._isBinded = true
          this._triggerBy = vm
          jQuery(this.$el).on(events[this.trigger] || 'click', this._triggerBy.toggle)
        }
       }
    }
  }
</script>

<style>

</style>
