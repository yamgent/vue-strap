<template>
    <div class="image-wrapper">
        <img :src="src" :alt="alt" :width="width" :height="height">
        <div class="image-caption">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      src: {
        type: String
      },
      alt: {
        type: String
      },
      height: {
        type: String
      },
      width: {
        type: String
      }
    }
  }
</script>

<style>
    .image-wrapper {
        display: inline-block;
        text-align: center;
        padding: 4px;
    }
</style>
