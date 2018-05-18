<template>
    <doc-section id="tipBoxDocs" name="TipBox">
        <p>Alternative alias: box</p>
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
            <tip-box type="info" icon=":rocket:">
                info but with rocket
            </tip-box>
            <tip-box type="info" color="white" background-color="red">
                info but with different colors
            </tip-box>
            <tip-box color="white" background-color="blue" border-color="darkblue">
                default with custom colors
            </tip-box>            
            <box background-color="white" border-color="grey" border-left-color="blue">
                empty box with left border
            </box>
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
            <tip-box type="info" icon=":rocket:">
                info but with rocket
            </tip-box>
            <tip-box type="info" color="white" background-color="red">
                info but with different colors
            </tip-box>
            <tip-box color="white" background-color="blue" border-color="darkblue">
                default with custom colors
            </tip-box>                       
            <box background-color="white" border-color="grey" border-left-color="blue">
                empty box with left border
            </box>
        </doc-code>
        <doc-table name="TipBox Options">
          <div>
            <p>backgroundColor</p>
            <p><code>String</code></p>
            <p><code>null</code></p>
            <p>Color of the background.</p>
          </div>
          <div>
            <p>borderColor</p>
            <p><code>String</code></p>
            <p><code>null</code></p>
            <p>Color of the entire border.</p>
          </div>
          <div>
            <p>borderLeftColor</p>
            <p><code>String</code></p>
            <p><code>null</code></p>
            <p>Color of the left border.</p>
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
            <p>Icon to be used inside.</p>
          </div>
          <div>
            <p>type</p>
            <p><code>String</code>, one of <code>warning</code>, <code>info</code>, <code>definition</code>, <code>success</code>, <code>tip</code>, <code>important</code>, <code>wrong</code>, or empty for default.</p>
            <p><code>'none'</code></p>
            <p></p>
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
