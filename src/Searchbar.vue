<script>
import typeahead from './Typeahead.vue';

export default {
  extends: typeahead,
  ready() {
    this.$els.dropdown.classList.add('search-dropdown-menu');
  },
  partials: {
    default: '<span v-html="item.title | highlight value"></span>'
      + '<br v-if="item.keywords" />'
      + '<small v-if="item.keywords" v-html="item.keywords | highlight value"></small>'
      + '<br v-if="item.heading" />'
      + '<small v-if="item.heading" v-html="item.heading.text | highlight value"></small>',
  },
  computed: {
    primitiveData() {
      if (!this.data) {
        return undefined;
      }
      const matches = [];
      const regex = new RegExp(this.value, 'i');
      this.data.forEach((entry) => {
        const { headings, src, title } = entry;
        const keywords = entry.keywords || '';
        let hasMatchingHeading = false;
        Object.entries(headings).forEach(([id, text]) => {
          if (regex.test(text)) {
            hasMatchingHeading = true;
            matches.push({
              heading: { id, text },
              keywords,
              src,
              title,
            });
          }
        });
        if (!hasMatchingHeading) {
          if (regex.test(title) || regex.test(keywords)) {
            matches.push(entry);
          }
        }
      });
      return matches;
    },
  },
  filters: {
    highlight(value, phrase) {
      return value.replace(new RegExp(`(${phrase})`, 'gi'), '<mark>$1</mark>');
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
