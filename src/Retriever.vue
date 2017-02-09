<template>
  <div>
    Loading...
  </div>
</template>

<script>
import {coerce, getFragmentByHash} from './utils/utils.js'

export default {
  props: {
    src: {
      type: String
    },
    fragment: {
      type: String // fragment identified (the '#' in URI)
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
          var result = response;
          if (this.fragment) {
            var tempDom = jQuery('<temp>').append(jQuery.parseHTML(result));
            var appContainer = jQuery('#' + this.fragment, tempDom);
            result = appContainer.html();
          }
          var element = jQuery(this.$el).html(result)
          this.$dispatch('retriever:fetched', element.get(0))
          this._hasFetched = true
        })
        .fail((error) => {
          console.error(error.responseText)
        });
    }
  },
  ready() {
    var hash = getFragmentByHash(this.src)
    if (hash) {
      this.fragment = hash
      this.src = this.src.split('#')[0];
    }
    if (!this.src) {
      this.$el.innerHTML = ''
    } else if (!this.delay) {
      this.fetch();
    }
  }
}
</script>
