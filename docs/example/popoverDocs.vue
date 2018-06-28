<template>
  <doc-section id="popover" name="Popover">
    <div class="bs-example">
      <popover v-for="place in placements" effect="fade" :content="text" :placement="place">
        <button class="btn btn-default">Popover on {{place}}</button>
      </popover>
      <hr>
      <h4>Title</h4>
      <popover v-for="place in placements" effect="fade" header title="Title" :content="text" :placement="place">
        <button class="btn btn-default">Popover on {{place}}</button>
      </popover>
      <hr>
      <h4>Trigger</h4>
      <p>
        <popover effect="scale" title="Title" :content="content" placement="top" trigger="hover">
          <button class="btn btn-default">Mouseenter</button>
        </popover>
        <popover effect="scale" title="Title" :content="text" placement="top" trigger="contextmenu">
          <button class="btn btn-default">Contextmenu (right click)</button>
        </popover>
      </p>
      <h4>Markdown</h4>
      <p>
        <popover effect="scale" title="**Emoji title** :rocket:" content="++emoji++ content :cat:">
          <button class="btn btn-default">Hover</button>
        </popover>
      </p>
      <h4>Content using slot</h4>
      <popover effect="scale" title="**Emoji title** :rocket:">
        <div slot="content">
          This is a long content...
        </div>

        <button class="btn btn-default">Hover</button>
      </popover>
      <h4>Wrap Text</h4>
      <popover header="false" content="Nice!">What do you say</popover>
    </div>
    <doc-code language="markup">
      <popover effect="fade" placement="bottom" title="Title" content="content">
        <button class="btn btn-default">Popover on bottom</button>
      </popover>

      Markdown
      <popover effect="scale" title="**Emoji title** :rocket:" content="++emoji++ content :cat:">
        <button class="btn btn-default">Hover</button>
      </popover>

      For larger content, use slot="content"
      <popover effect="scale" title="**Emoji title** :rocket:">
        <div slot="content">
          This is a long content...
        </div>

        <button class="btn btn-default">Hover</button>
      </popover>
    </doc-code>
    <doc-table>
      <div>
        <p>trigger</p>
        <p><code>String</code>, one of <code>click</code> <code>focus</code> <code>hover</code> <code>contextmenu</code></p>
        <p><code>hover</code></p>
        <p>How the popover is triggered.</p>
      </div>
      <div>
        <p>effect</p>
        <p><code>String</code>, one of <code>scale</code> <code>fade</code></p>
        <p><code>fade</code></p>
        <p></p>
      </div>
      <div>
        <p>title</p>
        <p><code>String</code>, or be markdown inline text</p>
        <p></p>
        <p></p>
      </div>
      <div>
        <p>content</p>
        <p><code>String</code>, or be markdown inline text</p>
        <p></p>
        <p></p>
      </div>
      <div>
        <p>header</p>
        <p><code>Boolean</code></p>
        <p><code>true</code></p>
        <p>Whether to show the header.</p>
      </div>
      <div>
        <p>placement</p>
        <p><code>String</code>, one of <code>top</code>
        <code>left</code>
        <code>right</code>
        <code>bottom</code></p>
        <p>top</p>
        <p>How to position the popover.</p>
      </div>
    </doc-table>
  </doc-section>
</template>

<script>
import docSection from './docSection.vue'
import docTable from './docTable.vue'
import docCode from './docCode.vue'
import popover from 'src/Popover.vue'

export default {
  components: {
    docSection,
    docTable,
    docCode,
    popover
  },
  data () {
    return {
      placements: ['top', 'left', 'right', 'bottom'],
      text: 'Lorem ipsum dolor sit amet',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod'
    }
  }
}
</script>
