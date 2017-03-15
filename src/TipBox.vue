<template>
    <div class="container" :class="[boxStyle]">
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
            return 'bg-warning'
          case 'info':
            return 'bg-info'
          case 'success':
            return 'bg-success'
          case 'important':
            return 'bg-danger'
          default:
            return 'bg-info'
        }
      },

      iconType() {
        switch (this.type) {
          case 'warning':
            return 'glyphicon-warning-sign'
          case 'info':
            return 'glyphicon-warning-sign'
          case 'success':
            return 'glyphicon-ok'
          case 'important':
            return 'glyphicon-star'
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
        padding: 4px 0;
        font-size: 64px;
        color: #333;
        display: flex;
        align-items: center;
    }

    .contents {
        padding: 8px 12px;
    }
</style>
