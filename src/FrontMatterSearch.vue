<script>
import Typeahead from './Typeahead.vue'
export default {
    extends: Typeahead,
    partials: {
      default: '<span v-html="item.title | highlight value"></span>'
    },
    computed: {
    primitiveData () {
      if (this.data) {
        return this.data.filter(value => {
          const title = value.title || ''
          const keywords = value.keywords || ''
          let matchAgainst = []
          if (keywords) {
            matchAgainst = keywords.split(',').map(value => value.trim())
          }
          matchAgainst.push(title)
          matchAgainst = this.matchCase ? matchAgainst : matchAgainst.map(value => value.toLowerCase())
          const query = this.matchCase ? this.value : this.value.toLowerCase()
          return this.matchStart ? matchAgainst.some(value => value.indexOf(query) === 0) : matchAgainst.some(value => value.indexOf(query) !== -1)
        }).slice(0, this.limit)
      }
    }
  },
  filters: {
    highlight (value, phrase) {
      if (value)  
        return value.replace(new RegExp('(' + phrase + ')', 'gi'), '<strong>$1</strong>')
    }
  }
}
</script>
