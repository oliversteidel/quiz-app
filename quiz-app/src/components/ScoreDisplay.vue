<template>
  <div class="wrapper--score flex-col ai-c">
    <p>score</p>
    <p v-bind:playerScore="playerScore" class="score-number">{{ this.playerScore }}</p>
  </div>
</template>

<script>
export default {
  name: "ScoreDisplay",
  props: ["playerScore"],
};
</script>

<style lang="scss" scoped>
@import "../styles/_globals.scss";

.wrapper--score {
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 0.625rem;
  background: $darkGray;
  color: $lightOrange;
  box-shadow: $shadow;

  p {
      font-size: 1.875rem;
      font-weight: 300;
  }

  .score-number {
      font-size: 3.125rem;
  }
}
</style>