<template>
    <div :class="['morph', {'morph-expanded': isOpen}]">
        <div class="morph-display-wrapper"
             @click.prevent="expand()"
             v-show="!isOpen">
            <slot name="display">
                <button class="morph-display-button btn btn-default">{{{title}}}</button>
            </slot>
        </div>

        <div class="morph-details"
             v-el:details
             v-show="isOpen">
            <dynamic-panel :header="title" :src="src" :is-open="isOpen" v-if="isDynamic">
                <button type="button" class="close-button btn btn-default" slot="button" @click.stop="close()">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
            </dynamic-panel>
            <Panel :header="title" v-else>
                <button type="button" class="close-button btn btn-default" slot="button" @click.stop="close()">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
                <slot></slot>
            </Panel>
        </div>
    </div>
</template>

<script>
  import {coerce} from './utils/utils.js'
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
        coerce: coerce.boolean,
        default: false
      },
      src: {
        type: String
      }
    },
    computed: {
      isDynamic() {
        return !!this.src;
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
