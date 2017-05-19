<template>
    <doc-section id="tipBoxDocs" name="TipBox">
        <div class="bs-example">
            <tip-box>
                default
            </tip-box>
            <tip-box type="info">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta distinctio eum ex facilis molestias nesciunt perferendis possimus veniam vero! A asperiores doloribus itaque odio omnis quod. Corporis ex id quibusdam.
            </tip-box>
            <tip-box type="warning">
                warning
            </tip-box>
            <tip-box type="success">
                success
            </tip-box>
            <tip-box type="important">
                warning
            </tip-box>
        </div>
        <doc-code language="markup">
            <tip-box>
                default
            </tip-box>
            <tip-box type="info">
                info (default)
            </tip-box>
            <tip-box type="warning">
                warning
            </tip-box>
            <tip-box type="success">
                success
            </tip-box>
            <tip-box type="important">
                warning
            </tip-box>
        </doc-code>
    </doc-section>
</template>

<script>
  import docSection from './docSection.vue'
  import docTable from './docTable.vue'
  import docCode from './docCode.vue'
  import tipBox from 'src/TipBox.vue'

  export default {
    components: {
      docSection,
      docTable,
      docCode,
      tipBox
    },
    created() {

    }
  }
</script>
