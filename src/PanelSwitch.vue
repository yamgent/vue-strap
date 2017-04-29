<template>
    <button type="button" class="collapse-button btn btn-default">
        <span :class="['glyphicon', {'glyphicon-menu-down': !isOpen, 'glyphicon-menu-up': isOpen}]"
              aria-hidden="true"></span>
    </button>
</template>

<script>
  import {coerce} from './utils/utils.js'

  export default {
    props: {
      isOpen: {
        type: Boolean,
        coerce: coerce.boolean,
        default: null
      },
    },
    methods: {
      toggle () {
        this.isOpen = !this.isOpen
        this.$dispatch('isOpenEvent', this, this.isOpen)
      }
    },
    created () {
      if (this.isOpen === null) {
        this.isOpen = false
      }
    }
  }
</script>

<style>
    .collapse-button {
        font-size: 10px !important;
        float: right;
        padding: 3px 8px !important;
        margin-left: 3px;
    }
</style>
