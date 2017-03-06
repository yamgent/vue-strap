require('./assets/docs.css')
require('./assets/style.css')
require('prismjs')
require('./js/showLanguage')

import $ from 'src/utils/NodeList.js'
import bodyDocs from './bodyDocs.vue'
import Closable from 'src/directives/Closable.js';
import Float from 'src/directives/Float.js';

Vue.config.devtools = true
Vue.config.debug = true
Vue.directive('closeable', Closable);
Vue.directive('float', Float);
new Vue({
  el: 'body',
  components: {
    bodyDocs,
  },
  created () {
    if (!this.$root.sections) {
      this.$root.sections = []
    }
  },
  ready () {
    var list = this.$root.sections
    while(list.length) list.pop()
    $('.bs-docs-section', this.$els.sections).each(el => {
      list.push({
        id: el.id,
        name: el.querySelector('.anchor').innerText,
        el: el
      })
    })
  }
})
