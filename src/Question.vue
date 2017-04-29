<template>
    <div class="question-wrapper">
        <div class="body-wrapper">
            <!-- Default slot is question body -->
            <slot></slot>
            <div v-if="hasInput" class="textarea-container">
                <div><strong>You can write your answer in the box below.</strong></div>
                <textarea class="form-control question-input" rows="3"></textarea>
            </div>
        </div>
        <accordion>
            <div v-show="hasHintSlot">
                <panel header="Hint" expandable no-close>
                    <slot name="hint">
                        No hint is available for this question.
                    </slot>
                </panel>
            </div>
            <panel header="Answer" expandable no-close>
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
    },
    props: {
      hasInput: {
        type: Boolean,
        coerce: coerce.boolean,
        default: false
      }
    },
    data () {
      return {
        hasHintSlot: true
      }
    },
    attached() {
      let hasHintSlot = !!this.$el.querySelector('[slot="hint"]');
      this.hasHintSlot = hasHintSlot
    }
  }
</script>

<style>
    .body-wrapper {
        padding-bottom: 10px;
    }
    .textarea-container {
        margin: 8px 0;
    }
    .textarea-container > textarea {
        margin: 4px 0;
    }
</style>
