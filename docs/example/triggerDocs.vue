<template>
    <doc-section id="triggerDocs" name="Trigger">
        Trigger provides more flexibility for triggering contextual information such as popover, tooltip.
        You could embed an trigger in the text, and define the Tooltip or popover at a separate location, which brings a cleaner authoring flow.

        <h4>Using trigger for Tooltip</h4>
        <div class="bs-example">
            More about <trigger for="tt:trigger">trigger</trigger>
            <tooltip id="tt:trigger" content="This tooltip triggered by a trigger"></tooltip>
        </div>
        <doc-code language="markup">
            More about <trigger for="tt:trigger">trigger</trigger>
            <tooltip id="tt:trigger_id" content="This tooltip triggered by a trigger"></tooltip>
        </doc-code>
        <h4>Using trigger for Popover</h4>
        <div class="bs-example">
            More about <trigger for="pop:trigger">trigger</trigger>
            <popover id="pop:trigger" header="false">
                <div slot="content">
                    <img src="https://vuejs.org/images/logo.png">
                </div>
            </popover>
        </div>
        <doc-code language="markup">
            More about <trigger for="pop:trigger_id">trigger</trigger>
            <popover id="pop:trigger_id" content="This popover is triggered by a trigger"></popover>
        </doc-code>
        <h4>Using trigger for Modal</h4>
        <div class="bs-example">
            More about <trigger for="modal:trigger">trigger</trigger>
            <modal title="**Modal title** :rocket:" id="modal:trigger">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </modal>
        </div>
        <doc-code language="markup">
            More about <trigger for="modal:trigger">trigger</trigger>
            <modal title="**Modal title** :rocket:" id="modal:trigger">
                ...
            </modal>
        </doc-code>
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
