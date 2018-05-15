<template>
    <doc-section id="triggerDocs" name="Trigger">
        <p>
            <code>Trigger</code> provides more flexibility for triggering contextual overlay such as popover, tooltip, modal.<br/>
            You could embed an trigger within the text, and define the Tooltip or Popover at a separate location, which brings a cleaner authoring flow. <br>
            Specify the <code>id</code> attribute on the popover, tooltip or modal component, and use the same id for the <code>for</code> attribute of the trigger
            to allow trigger to invoke the specific overlay elements. <br>
        </p>
        <p>
            Multiple <code>trigger</code> could share the same overlay by providing them the same id.
        </p>

        <h4>Using trigger for Tooltip</h4>
        <div class="bs-example">
            More about <trigger for="tt:trigger">trigger</trigger>.
            <tooltip id="tt:trigger" content="This tooltip triggered by a trigger"></tooltip>
            <br>
            This is the same <trigger for="tt:trigger">trigger</trigger> as last one.
        </div>
        <doc-code language="markup">
            More about <trigger for="tt:trigger_id">trigger</trigger>.
            <tooltip id="tt:trigger_id" content="This tooltip triggered by a trigger"></tooltip>
            <br>
            This is the same <trigger for="tt:trigger_id">trigger</trigger> as last one.
        </doc-code>
        <h4>Using trigger for Popover</h4>
        <div class="bs-example">
            More about <trigger for="pop:trigger">trigger</trigger>.
            <popover id="pop:trigger" content="This popover is triggered by a trigger"></popover>
            <br>
            This is the same <trigger for="pop:trigger">trigger</trigger> as last one.
        </div>
        <doc-code language="markup">
            More about <trigger for="pop:trigger_id">trigger</trigger>.
            <popover id="pop:trigger_id" content="This popover is triggered by a trigger"></popover>
            <br>
            This is the same <trigger for="pop:trigger_id">trigger</trigger> as last one.
        </doc-code>
        <h4>Using trigger for Modal</h4>
        <div class="bs-example">
            More about <trigger for="modal:trigger">trigger</trigger>.
            <modal title="**Modal title** :rocket:" id="modal:trigger">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </modal>
            <br>
            This is the same <trigger for="modal:trigger">trigger</trigger> as last one.
        </div>
        <doc-code language="markup">
            More about <trigger for="modal:trigger_id">trigger</trigger>.
            <modal title="**Modal title** :rocket:" id="modal:trigger_id">
                ...
            </modal>
            <br>
            This is the same <trigger for="modal:trigger_id">trigger</trigger> as last one.
        </doc-code>
        <doc-table>
            <div>
                <p>trigger</p>
                <p><code>String</code>, one of <code>click</code> <code>focus</code> <code>hover</code> <code>contextmenu</code></p>
                <p><code>hover</code></p>
                <p>How trigger triggers its overflow view.</p>
            </div>
            <div>
                <p>for</p>
                <p><code>String</code>, the id for the overlay view to be shown</p>
                <p></p>
                <p></p>
            </div>
        </doc-table>
    </doc-section>
</template>

<script>
  import docSection from './docSection.vue'
  import docTable from './docTable.vue'
  import docCode from './docCode.vue'
  import trigger from 'src/trigger.vue'
  import tooltip from 'src/Tooltip.vue'

  export default {
    components: {
      docSection,
      docTable,
      docCode,
      trigger,
      tooltip
    },
    created() {

    }
  }
</script>
