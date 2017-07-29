<template lang="html">
  <div class="medbox">
    <markdown-editor v-model="content" :configs="configs" ref="markdownEditor"></markdown-editor>
  </div>
</template>

<script>
import { markdownEditor } from 'vue-simplemde';
    export default {
        data: function(){
            return {
                content:'',
                configs: {
                    status: true,
                    initialValue: '',
                    renderingConfig: {
                        codeSyntaxHighlighting: true,
                        highlightingTheme: 'atom-one-light'
                    }
                }
            }
        },
        components: {
            markdownEditor
        }
    }
</script>

<style lang="css">
  .medbox{
    width: calc(100% - 20px);
    position: absolute;
    top: 20px;
    left: 10px;
  }
</style>
