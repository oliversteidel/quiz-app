<template>
  <div class="wrapper wrapper--difficulty flex-col ai-c">
    <label class="label--difficulty" for="select-difficulty"
      >select difficulty</label
    >

    <select
      id="select-difficulty"
      v-model="difficulty"
      @change="[$emit('send-difficulty', difficulty), attachLabelDifficulty()]"
    >
      <option
        v-for="option in diffOptions"
        :key="option.value"
        v-bind:value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectDifficulty",
  props: ["diffOptions"],
  data() {
    return {
      difficulty: "",
    };
  },
  methods: {
    sendDifficulty() {
      return this.difficulty;
    },
    attachLabelDifficulty() {
      const label = document.querySelector(".label--difficulty");
      const wrapper = document.querySelector(".wrapper--difficulty");
      label.classList.add("label--top");
      wrapper.classList.add("no-hover");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_globals.scss";

.wrapper--difficulty {
  width: 100%;
  max-width: 18.75rem;
  position: relative;
  margin-bottom: 0.5rem;

  @include breakpoint-up($medium) {  
    margin-bottom: 1rem;
  }
}

.wrapper--difficulty::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border: 0.75rem solid transparent;
  border-top-color: $lightOrange;
  border-radius: 3px;
  bottom: 0.75rem;
  right: 1.5rem;
  pointer-events: none;

  @include breakpoint-up($medium) {  
    border: 0.9375rem solid transparent; 
    bottom: 0.9375rem;   
  }
}

.wrapper--difficulty:not(.no-hover):hover .label--difficulty {
  animation: moveup-small 0.75s cubic-bezier(0.52, -0.68, 0.18, 1.51) forwards;
  color: $darkGray;

  @include breakpoint-up($medium) {    
    animation: moveup 0.75s cubic-bezier(0.52, -0.68, 0.18, 1.51) forwards;
  }
}

@keyframes moveup-small {
  0% {
    transform: translate(1rem, 3rem);
  }  
  100% {
    transform: translate(0);
  }
}

@keyframes moveup {
  0% {
    transform: translate(1rem, 3.6rem);
  }  
  100% {
    transform: translate(0);
  }
}

label {
  font-size: 1.25rem;
  font-weight: 300;
  align-self: flex-start;
  margin-bottom: 0.5rem;
  transform: translate(1rem, 3rem);
  color: $lightOrange;
  transition: color 0.75s ease-in;

  @include breakpoint-up($medium) {    
    font-size: 1.5625rem;
    transform: translate(1rem, 3.6rem);
  }
}

.label--top {
  transform: translate(0) rotate(0);
  color: $darkGray;
}

select {
  appearance: none;
  outline: none;
  border: none;
  width: 100%;
  max-width: 18.75rem;
  height: 3.75rem;
  padding: 0 1em;
  background: $darkGray;
  border-radius: 0.625rem;
  font-family: "Londrina Solid", cursive;
  font-size: 1.25rem;
  font-weight: 300;
  color: $lightOrange;
  box-shadow: $shadow;

  @include breakpoint-up($medium) { 
    font-size: 1.5625rem;   
    height: 4.6875rem;
  }

  option {
    border: none;
    border-radius: 0.625rem;
    font-family: inherit;
    font-size: 1.1rem;
    line-height: 2rem;
    color: $lightOrange;

    @include breakpoint-up($medium) {
      font-size: 1.2rem;
      line-height: 5rem;
    }
  }
}
</style>