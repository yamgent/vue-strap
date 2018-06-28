<script>
import typeahead from './Typeahead.vue';

export default {
  extends: typeahead,
  mounted() {
    this.$refs.dropdown.classList.add('search-dropdown-menu');
  },
  computed: {
    primitiveData() {
      function getTotalMatches(searchTarget, regexes) {
        return regexes.reduce((total, regex) => (regex.test(searchTarget) ? total + 1 : total), 0);
      }

      if (this.value.length < 2) {
        return [];
      }
      if (!this.data) {
        return undefined;
      }
      const matches = [];
      const regexes = this.value.split(' ')
        .filter(searchKeyword => searchKeyword !== '')
        .map(searchKeyword => new RegExp(searchKeyword, 'i'));
      this.data.forEach((entry) => {
        const { headings, src, title } = entry;
        const keywords = entry.keywords || '';
        let searchTarget = [title].concat(keywords).concat(Object.values(headings)).join(' ');
        let totalMatches = getTotalMatches(searchTarget, regexes);
        if (totalMatches > 0) {
          searchTarget = [title].concat(keywords).join(' ');
          const isMatchingPage = getTotalMatches(searchTarget, regexes) === totalMatches;
          if (isMatchingPage) {
            matches.push(Object.assign(entry, { totalMatches }));
          }
          Object.entries(headings).forEach(([id, text]) => {
            if (regexes.some(regex => regex.test(text))) {
              searchTarget = [title].concat(keywords).concat(text).join(' ');
              totalMatches = getTotalMatches(searchTarget, regexes);
              matches.push({
                heading: { id, text },
                keywords,
                src,
                title,
                totalMatches,
              });
            }
          });
        }
      });
      return matches.sort((a, b) => b.totalMatches - a.totalMatches);
    },
    entryTemplate() {
      return 'searchbarTemplate';
    },
  },
  components: {
    searchbarTemplate: {
      props: ['item', 'value'],
      template: '<div><span v-html="highlight(item.title, value)"></span>'
      + '<br v-if="item.keywords" />'
      + '<small v-if="item.keywords" v-html="highlight(item.keywords, value)"></small>'
      + '<br v-if="item.heading" />'
      + '<small v-if="item.heading" v-html="highlight(item.heading.text, value)"></small></div>',
      methods: {
        highlight(value, phrase) {
          return value.replace(new RegExp(`(${phrase})`, 'gi'), '<mark>$1</mark>');
        },
      },
    },
  },
};
</script>

<style>
.search-dropdown-menu {
  max-height: 30em;
  overflow-y: scroll;
}
</style>
