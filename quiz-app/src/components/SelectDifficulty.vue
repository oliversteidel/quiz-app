<template>
  <div class="wrapper">
    <label for="select-difficulty">select difficulty</label>

    <select id="select-difficulty" v-model="difficulty" @change="sendDifficulty">
      <option v-for="option in diffOptions" :key="option.value" v-bind:value="option.value" >
          {{option.text}}
      </option>
      
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectDifficulty",
  props: ['diffOptions'],
  data() {
    return {
      difficulty: ""
    }
  },
  methods: {
    sendDifficulty() {
      this.$emit('diff', this.difficulty);
    }    
  } 
}
</script>

<style lang="scss" scoped>
@import "../styles/_globals.scss";
</style>