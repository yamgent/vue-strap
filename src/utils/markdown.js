const markdownIt = require('markdown-it')({
  html: true,
  linkify: true
});

markdownIt.use(require('markdown-it-mark'))
  .use(require('markdown-it-emoji'))
  .use(require('markdown-it-ins'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-imsize'), {
    autofill: false
  })

export default markdownIt