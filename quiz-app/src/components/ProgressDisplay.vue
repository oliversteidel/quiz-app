<template>
  <div class="wrapper--progress flex-col ai-c">
    <p>progress</p>
    <p v-bind:playerProgress="playerProgress" class="progress-number">{{this.playerProgress}} / 10</p>
  </div>
</template>

<script>
export default {
  name: "ProgressDisplay",
  props: ["playerProgress"],
};
</script>

<style lang="scss" scoped>
@import "../styles/_globals.scss";

.wrapper--progress {
  width: 11.25rem;
  height: 6.25rem;
  border-radius: 0.625rem;
  background: $darkGray;
  color: $lightOrange;
  box-shadow: $shadow;

  p {
    font-size: 1.875rem;
    font-weight: 300;
  }

  .progress-number {
    font-size: 3.125rem;
  }
}
</style>

