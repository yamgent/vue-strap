<template>
  <div class="bs-docs-section" :id="id">
    <h1 class="page-header"><a :href="getIdAnchor" class="anchor">{{name}}</a></h1>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      required: true,
      type: String,
      default: null
    },
    name: {
      required: true,
      type: String,
      default: null
    }
  },
  computed: {
    getIdAnchor() {
      return `#${this.id}`;
    }
  },
  created () {
    this._section = true
  }
}
</script>
