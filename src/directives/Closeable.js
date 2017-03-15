module.exports = {
  isShown: true,
  bind () {
    jQuery(this.el).wrap(function () {
      return `<div style="position: relative;"></div>`;
    });
    let message = this.el.getAttribute('alt') || 'Expand Content';
    this.wrapper = jQuery(this.el).parent();
    this.wrapper.attr('class', `${this.el.className} closeable-wrapper`);
    this.wrapper.append('<span class="closeable-button label label-default" style="display: none; position: absolute; top: 0; left: 0; cursor: pointer;background: #d9534f;"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></span>');
    this.wrapper.append(`<a class="closeable-show hidden-print" style="display: none; cursor: pointer;text-decoration: underline">${message}</a>`);
    this.closeButton = this.wrapper.find('.closeable-button');
    this.showButton = this.wrapper.find('.closeable-show');
    this.closeButton.click(this.onClose.bind(this));
    this.showButton.click(this.onShow.bind(this));
    this.wrapper.on('mouseover', this.onMouseOver.bind(this));
    this.wrapper.on('mouseout', this.onMouseOut.bind(this));
  },
  onClose() {
    this.isShown = false;
    this.showButton.show();
    this.closeButton.hide();
    this.el.style.display = 'none';
  },
  onShow() {
    this.isShown = true;
    this.showButton.hide();
    this.el.style.display = '';
  },
  onMouseOver() {
    if (!this.isShown) {
      return;
    }
    this.closeButton.show();
  },
  onMouseOut() {
    if (!this.isShown) {
      return;
    }
    this.closeButton.hide();
  }
};
