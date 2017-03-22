<template>
    <doc-section id="tipBoxDocs" name="TipBox">
        <div class="bs-example">
            <tip-box>
                delectus deleniti dicta et ex hic ipsam iste, maxime mollitia nam praesentium quam quibusdam quo
                recusandae ut vel veniam.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore dolorum ea eaque earum ex fugit,
                impedit laboriosam nobis officia perferendis possimus quaerat quibusdam rem saepe soluta suscipit vel
                veritatis!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad beatae dolor doloribus dolorum
                esse excepturi exercitationem hic laudantium maiores necessitatibus quasi quibusdam quisquam,
                repudiandae sit soluta ullam unde voluptatibus.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad at autem dolorem error exercitationem fuga
                ipsa ipsam laborum laudantium libero modi nihil optio provident quasi quisquam quos, voluptas voluptates
                voluptatum.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, quam vero? Accusantium ad aperiam
                commodi id, impedit inventore iusto labore nesciunt omnis pariatur, quae repudiandae similique suscipit!
                Animi libero, quasi!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam dolore odit qui reiciendis
                suscipit voluptates. Ab, aut fugiat illum maiores maxime numquam provident quod sunt tenetur ut
                veritatis voluptatem?
            </tip-box>
            <tip-box type="important">
                important
            </tip-box>
        </div>
        <doc-code language="markup">
            <tip-box type="info">
                info (default)
            </tip-box>
            <tip-box type="warning">
                warning
            </tip-box>
            <tip-box type="success">
                warning
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
