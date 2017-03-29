<template>
    <div class="alert container" :class="[boxStyle]">
        <div class="icon-wrapper">
            <span class="glyphicon" :class="[iconType]" aria-hidden="true"></span>
        </div>
        <div class="contents">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'info'
      }
    },
    computed: {
      boxStyle() {
        switch (this.type) {
          case 'warning':
            return 'alert-warning'
          case 'info':
            return 'alert-info'
          case 'success':
            return 'alert-success'
          case 'important':
            return 'alert-danger'
          default:
            return 'alert-info'
        }
      },

      iconType() {
        switch (this.type) {
          case 'warning':
            return 'glyphicon-warning-sign'
          case 'info':
            return 'glyphicon-info-sign'
          case 'success':
            return 'glyphicon-ok'
          case 'important':
            return 'glyphicon-exclamation-sign'
          default:
            return 'glyphicon-warning-sign'
        }
      }
    }
  }
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        width: 100%;
        border-radius: 6px;
    }

    .icon-wrapper {
        display: flex;
    }

    .contents {
        padding: 0 6px;
    }
</style>
