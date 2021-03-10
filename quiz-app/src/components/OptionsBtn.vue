<template>
  <div
    class="btn btn--options flex ai-c jc-c"
    @click="$emit('toggle-options')"
    v-bind:showOptions="showOptions"
    v-bind:class="{ inactive: !showOptions }"
  >
    <img src="../assets/img/setup.svg" alt="" />
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "OptionsBtn",
  props: ["showOptions"],  
  mounted() {
    const container = document.querySelector(".container");
    const btn = document.querySelector(".btn--options");
    let btnWidth = btn.offsetWidth;
    let centerPos = (container.offsetWidth - 32) / 2 - btnWidth / 2;
    gsap.set(btn, { x: -centerPos });
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_globals.scss";

.btn--options {
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 0.625rem;
  background: $darkGray;
  color: $lightOrange;
  box-shadow: $shadow;
  cursor: pointer;
  transition: all 0.5s ease-out;

  @include breakpoint-up($small) {
    width: 4.6875rem;
  height: 4.6875rem;
  }

  @include breakpoint-up($medium) {
    width: 6.25rem;
    height: 6.25rem;
  }

  img {
    width: 50%;
    height: auto;
    color: $lightOrange;
  }
}

.inactive {
  transform: translateX(0) !important;
}

//
</style>