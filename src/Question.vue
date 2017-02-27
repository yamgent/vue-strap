<template>
    <div class="question-wrapper">
        <div class="body-wrapper">
            <slot name="body"></slot>
        </div>
        <accordion>
            <panel header="Hint" expandable>
                <slot name="hint"></slot>
            </panel>
            <panel header="Answer" expandable>
                <slot name="answer"></slot>
            </panel>
        </accordion>
    </div>
</template>

<script>
  import {coerce} from './utils/utils.js'
  import morph from './Morph.vue'
  import accordion from './Accordion.vue'
  import panel from './Panel.vue'

  export default {
    components: {
      panel,
      morph,
      accordion
    }
  }
</script>

<style>
</style>
