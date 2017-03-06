module.exports = {
  isShown: true,
  bind () {
    jQuery(this.el).wrap(function () {
      return `<div class="closeable-wrapper" style="position: relative;display: inline-block;"></div>`;
    });
    let message = 'Show Content';
    switch (this.el.tagName.toLowerCase()) {
      case 'img':
        message = 'Show Image';
        break;
      case 'iframe':
        message = 'Show Media';
        break;
    }
    this.wrapper = jQuery(this.el).parent();
    this.wrapper.append('<span class="closeable-overlay-button label label-default" style="display: none; position: absolute; top: 0; left: 0; cursor: pointer;"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></span>');
    this.wrapper.append(`<a class="closeable-overlay-show" style="margin: 1em;display: none; cursor: pointer;text-decoration: underline">${message}</a>`);
    this.closeButton = this.wrapper.find('.closeable-overlay-button');
    this.showButton = this.wrapper.find('.closeable-overlay-show');
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
