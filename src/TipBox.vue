<template>
  <div
    :class="[boxStyle]"
    :style="customStyle"
    class="alert container">
    <div v-if="!isDefault" class="icon-wrapper">
      <span v-html="iconType"></span>
    </div>
    <div class="contents">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import md from './utils/markdown';

export default {
  props: {
    backgroundColor: {
      type: String,
      default: null,
    },
    borderColor: {
      type: String,
      default: null,
    },
    borderLeftColor: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'none',
    },
  },
  computed: {
    isDefault() {
      return this.type === 'none';
    },
    boxStyle() {
      switch (this.type) {
      case 'warning':
        return 'alert-warning';
      case 'info':
      case 'definition':
        return 'alert-info';
      case 'success':
      case 'tip':
        return 'alert-success';
      case 'important':
      case 'wrong':
        return 'alert-danger';
      default:
        return 'alert-default';
      }
    },
    customStyle() {
      const style = {};
      if (this.backgroundColor) {
        style.backgroundColor = this.backgroundColor;
        style.borderColor = this.backgroundColor;
      }
      if (this.borderColor) {
        style.borderColor = this.borderColor;
      }
      if (this.borderLeftColor) {
        style.borderLeft = `5px solid ${this.borderLeftColor}`;
      }
      if (this.color) {
        style.color = this.color;
      }
      return style;
    },
    iconType() {
      if (this.icon) {
        return md.renderInline(this.icon);
      }
      switch (this.type) {
      case 'wrong':
        return '<i class="fas fa-times"></i>';
      case 'warning':
        return '<i class="fas fa-exclamation"></i>';
      case 'info':
        return '<i class="fas fa-info"></i>';
      case 'success':
        return '<i class="fas fa-check"></i>';
      case 'important':
        return '<i class="fas fa-flag"></i>';
      case 'tip':
        return '<i class="fas fa-lightbulb"></i>';
      case 'definition':
        return '<i class="fas fa-atlas"></i>';
      default:
        return '<i class="fas fa-exclamation"></i>';
      }
    },
  },
};
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
  margin-right: .5em;
  width: 22px;
  height: 22px;
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
