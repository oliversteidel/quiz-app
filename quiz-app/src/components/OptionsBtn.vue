<template>
  <div class="btn btn--options flex ai-c jc-c">
    <img src="../assets/img/setup.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "OptionsBtn",
};
</script>

<style lang="scss" scoped>
@import "../styles/_globals.scss";

.btn--options {
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 0.625rem;
  background: $darkGray;
  color: $lightOrange;
  box-shadow: $shadow;

  img {
    width: 50%;
    height: auto;
    color: $lightOrange;
  }
}
</style>