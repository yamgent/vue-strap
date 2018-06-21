<template>
    <div :class="['morph', {'morph-expanded': isOpenBool}]">
        <div class="morph-display-wrapper"
             @click.prevent="expand()"
             v-show="!isOpenBool">
            <slot name="display">
                <button class="morph-display-button btn btn-default" v-html="titleContent"></button>
            </slot>
        </div>

        <div class="morph-details"
             ref="details"
             v-show="isOpenBool">
            <dynamic-panel :header="title" :src="src" :is-open="true" v-if="isDynamic">
                <button type="button" class="close-button btn btn-default" slot="button" @click.stop="close()">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
            </dynamic-panel>
            <panel :header="title" v-else>
                <button type="button" class="close-button btn btn-default" slot="button" @click.stop="close()">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
                <slot></slot>
            </panel>
        </div>
    </div>
</template>

<script>
  import {toBoolean} from './utils/utils.js'
  import md from './utils/markdown.js'
  import panel from './Panel.vue'
  import dynamicPanel from './DynamicPanel.vue'

  export default {
    components: {
      panel,
      dynamicPanel
    },
    props: {
      title: {
        type: String
      },
      isOpen: {
        type: Boolean,
        default: false
      },
      src: {
        type: String
      }
    },
    computed: {
      // Vue 2.0 coerce migration
      isOpenBool () {
        return toBoolean(this.isOpen);
      },
      // Vue 2.0 coerce migration end
      isDynamic () {
        return !!this.src;
      },
      titleContent () {
        return md.renderInline(this.title)
      }
    },
    methods: {
      expand() {
        this.isOpen = true;
      },
      close() {
        this.isOpen = false;
      }
    },
    created () {
    }
  }
</script>

<style>
    .morph {
        display: inline-block;
    }

    .morph-expanded {
        display: block;
        margin-top: 10px;
    }

    .morph-details > .expandable-panel {
        margin-bottom: 20px!important;
    }

    .close-button {
        font-size: 10px !important;
        float: right;
        padding: 3px 8px !important;
    }
</style>
