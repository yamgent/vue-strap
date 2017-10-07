<template>
  <panel :header="header" :is-open="isOpen" :type="type" expandable no-switch bottom-switch>
    <slot name="button" slot="button"></slot>
    <retriever v-ref:retriever :src="src" :fragment="fragment" delay></retriever>
  </panel>
</template>

<script>
import {coerce, getFragmentByHash} from './utils/utils.js'
import retriever from './Retriever.vue'
import panel from './Panel.vue'

export default {
  props: {
    src: {
      type: String
    },
    fragment: {
      type: String
    },
    header: {
      type: String
    },
    isOpen: {
      type: Boolean,
      coerce: coerce.boolean,
      default: null
    },
    type: {
      type: String,
      default : null
    }
  },
  components: {
    panel,
    retriever
  },
  created() {
    if (this.src) {
      var hash = getFragmentByHash(this.src)
      if (hash) {
        this.fragment = hash
        this.src = this.src.split('#')[0]
      }
    }
  },
  ready() {
    if (this.isOpen) {
      this.$refs.retriever.fetch()
    }

    this.$on('isOpenEvent', (el, isOpen) => {
      if (isOpen) {
        this.$refs.retriever.fetch()
      }
    })
  },
  events: {
    'panel:expand': function (level) {
      // Consume and do nothing
    },
    'panel:collapse': function (level) {
      // Consume and do nothing
    }
  },
}
</script>
