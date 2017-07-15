<template>
    <div class="alert container" :class="[boxStyle]">
        <div class="icon-wrapper" v-if="!isDefault">
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
        default: 'none'
      }
    },
    computed: {
      isDefault() {
        return this.type === 'none'
      },
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
            return 'alert-default'
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
            return 'glyphicon-info-sign'
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
        width: 100%;
    }

    .alert-default {
        color: #24292e;
        background-color: #f6f8fa;
        border-color: #e8ebef;
    }
</style>
