<template>
  <doc-section id="tooltip" name="Tooltip">
    <div class="bs-example">
      <tooltip v-for="place in ['top','left','right','bottom']" header content="Lorem ipsum dolor sit amet" :placement="place">
        <button class="btn btn-default">Popover on {{place}}</button>
      </tooltip>
      <hr>
      <h4>Trigger</h4>
      <p>
        <tooltip effect="scale" content="Lorem ipsum dolor sit amet" placement="top" trigger="click">
          <button class="btn btn-default">Click</button>
        </tooltip>
        <tooltip effect="scale" content="Lorem ipsum dolor sit amet" placement="top" trigger="contextmenu">
          <button class="btn btn-default">Contextmenu (right click)</button>
        </tooltip>
      </p>
      <h4>Markdown</h4>
      <tooltip effect="scale" content="*Hello* **World**">
        <a href="">Hover me</a>
      </tooltip>
      <h4>Free Text</h4>
      <tooltip content=" coupling is the degree of interdependence between software modules; a measure of how closely
  connected two routines or modules are; the strength of the relationships between modules."><i>coupling</i></tooltip>

    </div>
    <doc-code language="markup">
      <tooltip effect="scale" placement="bottom" content="Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod">
        <button class="btn btn-default">tooltip on bottom</button>
      </tooltip>
      <h4>With markdown</h4>
      <tooltip effect="scale" content="*Hello* **World**">
        <a href="">Hover me</a>
      </tooltip>
    </doc-code>
    <doc-table>
      <div>
        <p>trigger</p>
        <p><code>String</code>, one of <code>click</code> <code>focus</code> <code>hover</code> <code>contextmenu</code></p>
        <p><code>hover</code></p>
        <p>How the tooltip is triggered.</p>
      </div>
      <div>
        <p>effect</p>
        <p><code>String</code>, one of <code>scale</code> <code>fadein</code></p>
        <p><code>scale</code></p>
        <p></p>
      </div>
      <div>
        <p>content</p>
        <p><code>String</code></p>
        <p></p>
        <p></p>
      </div>
      <div>
        <p>placement</p>
        <p><code>String</code>, one of <code>top</code>
        <code>left</code>
        <code>right</code>
        <code>bottom</code></p>
        <p></p>
        <p>How to position the tooltip.</p>
      </div>
    </doc-table>
  </doc-section>
</template>

<script>
import docSection from './docSection.vue'
import docTable from './docTable.vue'
import docCode from './docCode.vue'
import tooltip from 'src/Tooltip.vue'

export default {
  components: {
    docSection,
    docTable,
    docCode,
    tooltip
  },
  data () {
    return {
      text: 'Lorem ipsum dolor sit amet',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod'
    }
  }
}
</script>
