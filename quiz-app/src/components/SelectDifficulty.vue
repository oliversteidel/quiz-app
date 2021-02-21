<template>
  <div class="wrapper flex-col">
    <label for="select-difficulty">select difficulty</label>

    <select id="select-difficulty" v-model="difficulty" @change="$emit('send-difficulty', difficulty)">
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
      return this.difficulty;
    }    
  } 
}
</script>

<style lang="scss" scoped>
@import "../styles/_globals.scss";
</style>