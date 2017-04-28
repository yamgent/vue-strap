<template>
  <doc-section id="accordion" name="Accordion And Panel">
    <div class="bs-example">
      <checkbox :checked.sync="checked" type="primary">Open only one at a time.</checkbox>
      <p><v-select :options="types" clear-button :value.sync="selected" placeholder="Global type"></v-select></p>
      <p><v-select :options="types" clear-button :value.sync="first" placeholder="First element type"></v-select></p>
      <accordion :one-at-atime="checked" :type="selected">
        <panel is-open :type="first=='panel'?null:first">
          <strong slot="header"><u>[20 minutes] Part 1 - Software engineering rocks! : Introduction to Software Engineering</u></strong>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </panel>
        <panel header="Panel #2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </panel>
        <panel header="Panel #3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </panel>
        <panel header="Panel #4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </panel>
        <panel header="[20 minutes] Part 1 - Software engineering rocks! : Introduction to Software Engineering">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </panel>
      </accordion>

      <div v-closeable>
        <panel header="%%haha!%%">
          <img src="https://vuejs.org/images/logo.png" alt="">

          hahah

          <div v-closeable>

            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam architecto at dignissimos distinctio ea explicabo fugiat, ipsa itaque odit, rem sint totam, voluptas. Incidunt officiis quas veniam vitae voluptatum.
            <img src="https://vuejs.org/images/logo.png" alt="">
        </div>

        </panel>
      </div>

      Panel with Expand Switch

      <panel header="Parent" expandable ctrl-lvl="-1">
        <panel header="Child1" expandable>
          <panel header="Child2">
            <panel header="Child3" expandable>
              Parent 1
            </panel>
          </panel>
        </panel>
      </panel>
    </div>
    <doc-code language="markup">
      <accordion :one-at-atime="checked" type="info">
        <panel is-open type="primary">
          <strong slot="header"><u>Panel #1</u></strong>
          ...
        </panel>
        <panel header="Panel #2">
          ...
        </panel>
        <panel header="Panel #3">
          ...
        </panel>
        <panel header="Panel #4">
          ...
        </panel>
      </accordion>
    </doc-code>

    <div class="bs-example">
      Seamless panel type

      <panel header="Seamless - Click to expand" expandable type="seamless">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dignissimos, doloribus dolorum ducimus eius
        eligendi est et excepturi iure iusto laborum, perferendis possimus quod repudiandae sapiente similique tenetur
        ullam voluptates!
      </panel>

      <panel header="Primary inside seamless" expandable>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dignissimos, doloribus dolorum ducimus eius
        eligendi est et excepturi iure iusto laborum, perferendis possimus quod repudiandae sapiente similique tenetur
        ullam voluptates!
      </panel>

      <panel header="Seamless - Click to expand" expandable type="seamless">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dignissimos, doloribus dolorum ducimus eius
        eligendi est et excepturi iure iusto laborum, perferendis possimus quod repudiandae sapiente similique tenetur
        ullam voluptates!

        <panel header="Primary inside seamless" expandable>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dignissimos, doloribus dolorum ducimus eius
          eligendi est et excepturi iure iusto laborum, perferendis possimus quod repudiandae sapiente similique tenetur
          ullam voluptates!
        </panel>
      </panel>

      <panel header="Seamless - Click to expand" expandable type="seamless">
        <Question>
          Body

          <div slot="hint">
            Hint

          </div>
          <div slot="answer">
            Answer

          </div>
        </Question>
      </panel>
    </div>
    <doc-code language="markup">
      <panel header="Click to expand" expandable type="seamless">
        ...
      </panel>

    </doc-code>

    <div class="bs-example">
      Use markdown in the header (only inline level markdown are supported)

      <panel header="**haha** :rocket: ![](https://vuejs.org/images/logo.png =25x25)" expandable type="seamless">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequatur consequuntur culpa enim, explicabo impedit iure maxime omnis quas recusandae sint suscipit? Accusamus cumque facere laboriosam magnam magni numquam reprehenderit.
      </panel>
    </div>
    <doc-code language="markup">
      <panel header="**haha** :rocket: ![](https://vuejs.org/images/logo.png =25x25)" expandable type="seamless">
        ...
      </panel>

    </doc-code>


    <doc-table>
      <div>
        <p>type</p>
        <p><code>String</code></p>
        <p><code>null</code></p>
        <p>Define the type of color for the tabs (global).</p>
      </div>
      <div>
        <p>one-at-time</p>
        <p><code>Boolean</code></p>
        <p><code>false</code></p>
        <p>Control whether expanding an item will cause the other items to close.</p>
      </div>
    </doc-table>
    <doc-table name="Panel">
      <div>
        <p>header</p>
        <p><code>String</code></p>
        <p></p>
        <p>The clickable text on the group's header. You need one to be able to click on the header for toggling.</p>
      </div>
      <div>
        <p>is-open</p>
        <p><code>Boolean</code></p>
        <p><code>false</code></p>
        <p>Whether accordion group is open or closed.</p>
      </div>
      <div>
        <p>type</p>
        <p><code>String</code></p>
        <p><code>null</code></p>
        <p>Define the type of color for the tab (single).</p>
      </div>
    </doc-table>
    <p>If you want to personalice your header with some html you can use the slot instead of header attribute (panel&nbsp;#1 in the example).</p>
  </doc-section>
</template>

<script>
import docSection from './docSection.vue'
import docTable from './docTable.vue'
import docCode from './docCode.vue'
import accordion from 'src/Accordion.vue'
import checkbox from 'src/Checkbox.vue'
import panel from 'src/Panel.vue'
import vSelect from 'src/Select.vue'
import question from 'src/Question.vue'

export default {
  components: {
    docSection,
    docTable,
    docCode,
    accordion,
    checkbox,
    panel,
    vSelect,
    question
  },
  data () {
    return {
      checked: true,
      selected: 'info',
      first: 'primary',
      types: ['default', 'primary', 'info', 'success', 'warning', 'danger']
    }
  }
}
</script>
