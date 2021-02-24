<template>
  <button class="btn--start"
  @click="$emit('start-game')" >start</button>
</template>

<script>
export default {
  name: "StartBtn",
};
</script>

<style lang="scss" scoped>
@import "../styles/_globals.scss";

.btn--start {
  border: none;
  width: 100%;
  max-width: 18.75rem;
  height: 4.6875rem;
  padding: 0 1em;
  background: $darkGray;
  border-radius: 0.625rem;
  font-family: "Londrina Solid", cursive;
  font-size: 1.5625rem;
  font-weight: 300;
  color: $lightOrange;
  box-shadow: $shadow;
  cursor: pointer;
}
</style>