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
      if (this.value.length < 2) {
        return [];
      }
      if (!this.data) {
        return undefined;
      }
      const matches = [];
      const regexes = this.value.split(' ').map(searchKeyword => new RegExp(searchKeyword, 'i'));
      this.data.forEach((entry) => {
        const { headings, src, title } = entry;
        const keywords = entry.keywords || '';
        let searchTarget = [title].concat(keywords).join(' ');
        const isMatchingPage = regexes.every(regex => regex.test(searchTarget));
        if (isMatchingPage) {
          matches.push(entry);
        }
        Object.entries(headings).forEach(([id, text]) => {
          searchTarget = [title].concat(keywords).concat(text).join(' ');
          if (isMatchingPage || regexes.every(regex => regex.test(searchTarget))) {
            matches.push({
              heading: { id, text },
              keywords,
              src,
              title,
            });
          }
        });
      });
      return matches;
    },
  },
  filters: {
    highlight(value, phrase) {
      function getMatchIntervals() {
        const keywords = phrase.split(' ').filter(keyword => keyword !== '');
        const matchIntervals = [];
        keywords.forEach((keyword) => {
          const regex = new RegExp(`(${keyword})`, 'gi');
          let match = regex.exec(value);
          while (match !== null) {
            matchIntervals.push({ start: match.index, end: regex.lastIndex });
            match = regex.exec(value);
          }
        });
        return matchIntervals;
      }

      // https://www.geeksforgeeks.org/merging-intervals/
      function mergeOverlappingIntervals(intervals) {
        if (intervals.length <= 1) {
          return intervals;
        }
        return intervals
          .sort((a, b) => a.start - b.start)
          .reduce((stack, current) => {
            const top = stack[stack.length - 1];
            if (!top || top.end < current.start) {
              stack.push(current);
            } else if (top.end < current.end) {
              top.end = current.end;
            }
            return stack;
          }, []);
      }

      const matchIntervals = mergeOverlappingIntervals(getMatchIntervals());
      let highlightedValue = value;
      // Traverse from back to front to avoid the positioning going out of sync
      for (let i = matchIntervals.length - 1; i >= 0; i -= 1) {
        highlightedValue = `${highlightedValue.slice(0, matchIntervals[i].start)}<mark>`
                         + `${highlightedValue.slice(matchIntervals[i].start, matchIntervals[i].end)}</mark>`
                         + `${highlightedValue.slice(matchIntervals[i].end)}`;
      }
      return highlightedValue;
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
