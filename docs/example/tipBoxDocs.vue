<template>
    <doc-section id="tipBoxDocs" name="TipBox">
        <p>Alias: box</p>
        <div class="bs-example">
            <tip-box>
                default
            </tip-box>
            <tip-box type="info">
                info
            </tip-box>
            <tip-box type="warning">
                warning
            </tip-box>
            <tip-box type="success">
                success
            </tip-box>
            <tip-box type="important">
                important
            </tip-box>
            <tip-box type="wrong">
                wrong
            </tip-box>
            <tip-box type="tip">
                tip
            </tip-box>
            <tip-box type="definition">
                definition
            </tip-box>
        </div>
        <doc-code language="markup">
            <tip-box>
                default
            </tip-box>
            <tip-box type="info">
                info
            </tip-box>
            <tip-box type="warning">
                warning
            </tip-box>
            <tip-box type="success">
                success
            </tip-box>
            <tip-box type="important">
                important
            </tip-box>
            <tip-box type="wrong">
                wrong
            </tip-box>
            <tip-box type="tip">
                tip
            </tip-box>
            <tip-box type="definition">
                definition
            </tip-box>
        </doc-code>
        <br>
        <h4>Custom boxes</h4>
        <div class="bs-example">
            <box background-color="white" border-color="grey" border-left-color="blue">
                default, styled as empty box with blue left border
            </box>
            <box type="info" icon=":rocket:">
                info, with rocket icon
            </box>
        </div>
        <doc-code language="markup">
            <box background-color="white" border-color="grey" border-left-color="blue">
                default, styled as empty box with blue left border
            </box>
            <box type="info" icon=":rocket:">
                info, with rocket icon
            </box>
        </doc-code>
        <doc-table name="TipBox">
          <div>
            <p>background-color</p>
            <p><code>String</code></p>
            <p><code>null</code></p>
            <p></p>
          </div>
          <div>
            <p>border-color</p>
            <p><code>String</code></p>
            <p><code>null</code></p>
            <p></p>
          </div>
          <div>
            <p>border-left-color</p>
            <p><code>String</code></p>
            <p><code>null</code></p>
            <p>Overrides border-color for the left border.</p>
          </div>
          <div>
            <p>color</p>
            <p><code>String</code></p>
            <p><code>null</code></p>
            <p>Color of the text.</p>
          </div>
          <div>
            <p>icon</p>
            <p><code>String</code></p>
            <p><code>null</code></p>
            <p></p>
          </div>
          <div>
            <p>type</p>
            <p><code>String</code></p>
            <p><code>'none'</code></p>
            <p>Support: <code>info</code>, <code>warning</code>, <code>success</code>, <code>important</code>, <code>wrong</code>, <code>tip</code>, <code>definition</code>, or empty for default.</p></p>
          </div>
        </doc-table>
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
