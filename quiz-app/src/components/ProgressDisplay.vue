<template>
  <div class="wrapper--progress flex-col ai-c" v-bind:class="{ 'inactive' : showOptions}">
    <p>progress</p>
    <p v-bind:playerProgress="playerProgress" class="progress-number">{{this.playerProgress}} / 10</p>
  </div>
</template>

<script>
export default {
  name: "ProgressDisplay",
  props: ["playerProgress", "showOptions"],
};
</script>

<style lang="scss" scoped>
@import "../styles/_globals.scss";

.wrapper--progress {
  width: 8.125rem;
  height: 3.75rem;
  border-radius: 0.625rem;
  background: $darkGray;
  color: $lightOrange;
  box-shadow: $shadow;
  transition: transform 0.5s ease-in;

  @include breakpoint-up($small) {
    width: 9.375rem;
  height: 4.6875rem;
  }

  @include breakpoint-up($medium) {
    width: 11.25rem;
    height: 6.25rem;
  }

  p {
      font-size: 1.25rem;
      font-weight: 300;

      @include breakpoint-up($small) {
        font-size: 1.5625rem;
      }

      @include breakpoint-up($medium) {
        font-size: 1.875rem;
      }
  }

  .progress-number {
    font-size: 1.9rem;

      @include breakpoint-up($small) {
        font-size: 2.1875rem;
      }

      @include breakpoint-up($medium) {
        font-size: 3.125rem;
      }
  }
}

.inactive {
  transform: translateX(-540px);
}
</style>

