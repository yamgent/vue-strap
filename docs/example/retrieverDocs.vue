<template>
  <doc-section id="retriever" name="Retriever">
    <div class="bs-example">
      <retriever src="/docs/loadContent.html"></retriever>
      <retriever src="/docs/loadContent.html#fragment"></retriever>
    </div>
    <doc-code language="markup">
      <retriever src="/docs/loadContent.html"></retriever>
      <retriever src="/docs/loadContent.html#fragment"></retriever>
    </doc-code>
    <doc-table>

    </doc-table>
  </doc-section>
</template>

<script>
import docSection from './docSection.vue'
import docTable from './docTable.vue'
import docCode from './docCode.vue'
import retriever from 'src/Retriever.vue'
import panel from 'src/Panel.vue'

export default {
  components: {
    docSection,
    docTable,
    docCode,
    retriever,
    panel
  },
  created() {

  }
}
</script>
