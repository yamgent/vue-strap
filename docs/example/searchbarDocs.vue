<template>
  <doc-section id="searchbarDocs" name="Searchbar">
    <div class="bs-example">
      <searchbar
        :data="searchData"
        :on-hit="consoleCallback"/>
    </div>
    <doc-code language="markup">
      <searchbar
        :data="searchData"
        :on-hit="consoleCallback"/>
    </doc-code>
    <doc-code language="javascript">
      <!-- eslint-disable vue/html-indent, vue/no-parsing-error, vue/valid-v-html -->
      new Vue {
        components: {
          searchbar
        },
        data() {
          return {
            searchData: [
              {
                'headings': {
                  'normal-include': 'Normal include',
                  'establishing-requirements': 'Establishing Requirements',
                  'include-segment': 'Include segment',
                  'dynamic-include': 'Dynamic include',
                  'boilerplate-include': 'Boilerplate include',
                  'nested-include': 'Nested include',
                  'html-include': 'HTML include',
                  'include-from-another-markbind-site': 'Include from another Markbind site',
                  'feature-list': 'Feature list',
                },
                'keywords': 'k1, k2, k3',
                'src': 'index.md',
                'title': 'Hello World',
              },
              {
                'headings': {
                  'popover-initiated-by-trigger-honor-trigger-attribute':
                    'popover initiated by trigger: honor trigger attribute',
                  'support-multiple-inclusions-of-a-modal': 'Support multiple inclusions of a modal',
                  'remove-extra-space-in-links': 'Remove extra space in links',
                },
                'keywords': 'k4, k5, k6',
                'src': 'bugs/index.md',
                'title': 'Open Bugs',
              },
              {
                'headings': {
                  'feature-list': 'Feature list',
                },
                'keywords': 'k7, k8, k9',
                'src': 'sub_site/index.md',
                'title': 'Feature Page',
              },
            ],
          };
        },
        methods: {
          consoleCallback(match) {
            const page = `/${match.src.replace('.md', '.html')}`;
            const anchor = match.heading ? `#${match.heading.id}` : '';
            console.log(`${page}${anchor}`);
          },
        },
      }
      <!-- eslint-enable vue/html-indent, vue/no-parsing-error, vue/valid-v-html -->
    </doc-code>
    <doc-table>
      <div>
        <p>data</p>
        <p><code>Array</code></p>
        <p></p>
        <p>The local data source for suggestions. Expected to be a primitive array.</p>
      </div>
      <div>
        <p>on-hit</p>
        <p><code>Function</code></p>
        <p></p>
        <p>A callback function when you click or hit return on an item.</p>
      </div>
      <div>
        <p>template</p>
        <p><code>String</code></p>
        <p>See below.</p>
        <p>Used to render suggestion.</p>
      </div>
      <div>
        <p>template-name</p>
        <p><code>String</code></p>
        <p></p>
        <p>Used to specify name of the template.</p>
      </div>
    </doc-table>
    Default template:
    <doc-code>
      <!-- eslint-disable vue/no-parsing-error, vue/valid-v-html -->
      <span v-html="highlight(item.title, value)"></span>
      <br v-if="item.keywords" />
      <small v-if="item.keywords" v-html="highlight(item.keywords, value)"></small>
      <br v-if="item.heading" />
      <small v-if="item.heading" v-html="highlight(item.heading.text, value)"></small>
      <!-- eslint-enable vue/no-parsing-error, vue/valid-v-html -->
    </doc-code>
  </doc-section>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import searchbar from 'src/Searchbar.vue';

import docCode from './docCode.vue';
import docSection from './docSection.vue';
import docTable from './docTable.vue';

export default {
  components: {
    docCode,
    docSection,
    docTable,
    searchbar,
  },
  data() {
    return {
      searchData: [
        {
          'headings': {
            'normal-include': 'Normal include',
            'establishing-requirements': 'Establishing Requirements',
            'include-segment': 'Include segment',
            'dynamic-include': 'Dynamic include',
            'boilerplate-include': 'Boilerplate include',
            'nested-include': 'Nested include',
            'html-include': 'HTML include',
            'include-from-another-markbind-site': 'Include from another Markbind site',
            'feature-list': 'Feature list',
          },
          'keywords': 'k1, k2, k3',
          'src': 'index.md',
          'title': 'Hello World',
        },
        {
          'headings': {
            'popover-initiated-by-trigger-honor-trigger-attribute':
              'popover initiated by trigger: honor trigger attribute',
            'support-multiple-inclusions-of-a-modal': 'Support multiple inclusions of a modal',
            'remove-extra-space-in-links': 'Remove extra space in links',
          },
          'keywords': 'k4, k5, k6',
          'src': 'bugs/index.md',
          'title': 'Open Bugs',
        },
        {
          'headings': {
            'feature-list': 'Feature list',
          },
          'keywords': 'k7, k8, k9',
          'src': 'sub_site/index.md',
          'title': 'Feature Page',
        },
      ],
    };
  },
  methods: {
    consoleCallback(match) {
      const page = `/${match.src.replace('.md', '.html')}`;
      const anchor = match.heading ? `#${match.heading.id}` : '';
      // eslint-disable-next-line no-console
      console.log(`${page}${anchor}`);
    },
  },
};
</script>
