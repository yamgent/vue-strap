<template>
  <doc-section id="dynamicPanel" name="DynamicPanel">
    <div class="bs-example">
      <dynamic-panel src="/docs/loadContent.html" header="Load content from 'content.html'" is-open expandable></dynamic-panel>
    </div>
    <doc-code language="markup">
      <dynamic-panel src="/docs/loadContent.html"
                     header="Load content from 'content.html'"
                     is-open expandable></dynamic-panel>
    </doc-code>
    <doc-table>

    </doc-table>
  </doc-section>
</template>

<script>
import docSection from './docSection.vue'
import docTable from './docTable.vue'
import docCode from './docCode.vue'
import dynamicPanel from 'src/DynamicPanel.vue'

export default {
  components: {
    docSection,
    docTable,
    docCode,
    dynamicPanel
  },
  created() {

  }
}
</script>
