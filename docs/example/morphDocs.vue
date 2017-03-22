<template>
    <doc-section id="morph" name="Morph">
        <div class="bs-example">
            <morph title="Q1">
                <div>
                    Content of Q1
                </div>
            </morph>
            <morph title="Q2">
                <div>
                    Content of Q2
                </div>
            </morph>
            <morph title="Q3">
                <div>
                    Content of Q3
                </div>
            </morph>
            <morph title="**Q4** :cat:">
                <div>
                    Content of Q4
                </div>
            </morph>
        </div>
        <doc-code language="markup">
            Markdown is supported for title.
            <morph title="**Q4** :cat:">
                <div>
                    Content of Q4
                </div>
            </morph>
        </doc-code>
        <doc-table>

        </doc-table>
    </doc-section>
</template>

<script>
  import docSection from './docSection.vue'
  import docTable from './docTable.vue'
  import docCode from './docCode.vue'
  import morph from 'src/Morph.vue'

  export default {
    components: {
      docSection,
      docTable,
      docCode,
      morph
    },
    created() {

    }
  }
</script>
