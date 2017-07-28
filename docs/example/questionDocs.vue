<template>
    <doc-section id="question" name="Question">
        <p>
            Question shows a structure like below, which consists of a question body, hint and answer.
        </p>
        <div class="bs-example">
            <Question>
                Body
                <div slot="hint">
                    Hint
                </div>
                <div slot="answer">
                    Answer
                </div>
            </Question>
        </div>
        <p>If no Hint slot is specified, it will not show:</p>
        <div class="bs-example">
            <Question>
                Body
                <div slot="answer">
                    Answer
                </div>
            </Question>
        </div>
        <p>If no Answer slot is specified, it will not show:</p>
        <div class="bs-example">
            <Question>
                Body
            </Question>
        </div>
        <p>
            Question could be used with Morph component to create a inline question group.<br>
            Could be also stored in a remote file and load it when it is to be shown.
        </p>
        <div class="bs-example">
            <morph title="Review question">
                <Question>
                    Body
                    <div slot="hint">
                        Hint
                    </div>
                    <div slot="answer">
                        Answer
                    </div>
                </Question>
            </morph>
            <morph title="Remote question" src="docs/question.html"></morph>
        </div>
        <p>
            Use <code>has-input</code> attribute to add an input box for user to enter their answer.
        </p>
        <div class="bs-example">
            <Question has-input>
                Body
                <div slot="hint">
                    Hint
                </div>
                <div slot="answer">
                    Answer
                </div>
            </Question>
        </div>

        <doc-code language="markup">
            Use alone
            <Question>
                Body
                <div slot="hint">
                    Hint
                </div>
                <div slot="answer">
                    Answer
                </div>
            </Question>

            If no Hint slot is specified, it will not show:
            <Question>
                Body
                <div slot="answer">
                    Answer
                </div>
            </Question>

            If no Answer slot is specified, it will not show:
            <Question>
                Body
            </Question>

            Use inline with Morph
            <morph title="Review question">
                <Question>
                    Body
                    <div slot="hint">
                        Hint
                    </div>
                    <div slot="answer">
                        Answer
                    </div>
                </Question>
            </morph>

            Use inline with Morph dynamic loading
            <morph title="Remote question" src="docs/question.html">
            </morph>
        </doc-code>
        <doc-table>

        </doc-table>
    </doc-section>
</template>

<script>
  import docSection from './docSection.vue'
  import docTable from './docTable.vue'
  import docCode from './docCode.vue'
  import question from 'src/Question.vue'
  import morph from 'src/Morph.vue'

  export default {
    components: {
      docSection,
      docTable,
      docCode,
      question,
      morph
    },
    created() {
      this.$on('retriever:fetched', function (el) {
        this.$compile(el);
      });
    }
  }
</script>
