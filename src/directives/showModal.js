export default {
  bind() {
    jQuery(this.el).click(() => {
      this.vm.$dispatch('modal:shouldShow', this.expression)
    });
  }
}