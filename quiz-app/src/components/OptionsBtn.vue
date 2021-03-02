<template>
  <div class="btn btn--options flex ai-c jc-c" 
  @click="$emit('toggle-options')"
  v-bind:showOptions="showOptions"
  v-bind:class="{ 'active' : showOptions }" 
  >
    <img src="../assets/img/setup.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "OptionsBtn",
  props: [ 'showOptions' ],
 
  
};
</script>

<style lang="scss" scoped>
@import "../styles/_globals.scss";

.btn--options {
  width: 4.6875rem;
  height: 4.6875rem;
  border-radius: 0.625rem;
  background: $darkGray;
  color: $lightOrange;
  box-shadow: $shadow;
  cursor: pointer;
  transition: all .5s ease-out;

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

.active {
  transform: translate(-150%, 0);  
}

//
</style>