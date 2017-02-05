<template>
  <div>
    Loading...
  </div>
</template>

<script>
import {coerce} from './utils/utils.js'

export default {
  props: {
    src: {
      type: String
    },
    delay: {
      type: Boolean,
      coerce: coerce.boolean,
      default: false
    },
    _hasFetched: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    fetch() {
      if (this._hasFetched) {
        return;
      }
      jQuery.get(this.src)
        .done((response) => {
          var element = jQuery(this.$el).html(response)
          this.$dispatch('retriever:fetched', element.get(0))
          this._hasFetched = true
        })
        .fail((error) => {
          console.error(error.responseText)
        });
    }
  },
  ready() {
    if (!this.src) {
      this.$el.innerHTML = ''
    } else if (!this.delay) {
      this.fetch();
    }
  }
}
</script>
