<template>
  <div class="container">
    <SelectDifficulty 
    v-bind:diffOptions="diffOptions"
    v-on:diff="$emit('diff', difficulty)" />
  </div>
</template>

<script>
import SelectDifficulty from "./SelectDifficulty";

export default {
  name: "StartDisplay",
  components: {
    SelectDifficulty,
  },
  props: ["diffOptions", "difficulty"],
};
</script>