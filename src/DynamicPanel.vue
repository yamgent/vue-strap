<template>
  <panel :header="header" :is-open="isOpenBool" :type="type" expandable no-switch>
    <slot name="button" slot="button"></slot>
    <retriever ref="retriever" :src="src" :fragment="fragment" delay></retriever>
  </panel>
</template>

<script>
import {getFragmentByHash, toBoolean} from './utils/utils.js'
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
      default: null
    },
    type: {
      type: String,
      default : null
    }
  },
  computed: {
    // Vue 2.0 coerce migration
    isOpenBool () {
      return toBoolean(this.isOpen);
    }
    // Vue 2.0 coerce migration end
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
  mounted() {
    this.$nextTick(function () {
      if (this.isOpenBool) {
        this.$refs.retriever.fetch()
      }

      this.$on('is-open-event', (el, isOpen) => {
        if (isOpen) {
          this.$refs.retriever.fetch()
        }
      })
    })
  },
}
</script>
