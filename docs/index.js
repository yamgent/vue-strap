require('./assets/docs.css')
require('./assets/style.css')
require('prismjs')
require('./js/showLanguage')

import $ from 'src/utils/NodeList.js'
import bodyDocs from './bodyDocs.vue'
import VueStrap from 'src/index.js';

Vue.config.devtools = true
Vue.use(VueStrap);
var vm = new Vue({
  el: 'body',
  components: {
    bodyDocs,
  },
  created () {
    if (!this.$root.sections) {
      this.$root.sections = []
    }
  },
  mounted () {
    Vue.nextTick(function() {
      var list = this.$root.sections
      while(list.length) list.pop()
      $('.bs-docs-section', this.$refs.sections).each(el => {
        list.push({
          id: el.id,
          name: el.querySelector('.anchor').innerText,
          el: el
        })
      })
    });
  }
})

VueStrap.installEvents(vm)
