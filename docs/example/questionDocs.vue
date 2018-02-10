<template>
    <doc-section id="question" name="Question">
        <h4>
            Question component consists of a question body, a hint and an answer.
        </h4>
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
        <h4>If no Hint slot is specified, it will not show:</h4>
        <div class="bs-example">
            <Question>
                Body
                <div slot="answer">
                    Answer
                </div>
            </Question>
        </div>
        <h4>If no Answer slot is specified, it will not show:</h4>
        <div class="bs-example">
            <Question>
                Body
            </Question>
        </div>
        <h4>
            Question component can be used with Morph component to create an inline question group.
        </h4>
        <p>
            It can also be stored in a remote file and loaded when it is to be shown.
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
        <h4>
            Use <code>has-input</code> attribute to add an input box for users to enter their answer.
        </h4>
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
