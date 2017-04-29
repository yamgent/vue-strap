<template>
    <doc-section id="imageDocs" name="Pic">
        <div class="bs-example">
            <pic src="https://vuejs.org/images/logo.png" alt="Logo">
                Logo For Vue.js
            </pic>
        </div>
        <doc-code language="markup">
            <pic src="https://vuejs.org/images/logo.png" alt="Logo">
                Logo For Vue.js
            </pic>
        </doc-code>
    </doc-section>
</template>

<script>
  import docSection from './docSection.vue'
  import docTable from './docTable.vue'
  import docCode from './docCode.vue'
  import pic from 'src/Pic.vue'

  export default {
    components: {
      docSection,
      docTable,
      docCode,
      pic
    },
    created() {

    }
  }
</script>
