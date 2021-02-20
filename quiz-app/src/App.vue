<template>
  <div id="app">
    <h1 class="title">Do you know?</h1>
    <div class="container flex-col ai-c">
      <header class="header">
        <OptionsBtn />
      </header>
      <StartDisplay 
      v-bind:diffOptions="diffOptions"
      v-on:diff="setDifficulty" />
    </div>
  </div>
</template>

<script>
import OptionsBtn from "./components/OptionsBtn";
import StartDisplay from "./components/StartDisplay";

export default {
  name: "App",
  components: {
    OptionsBtn,
    StartDisplay,
  },
  data() {
    return {
      showOptions: true,
      diffOptions: [
        { text: "easy", value: "&difficulty=easy" },
        { text: "medium", value: "&difficulty=medium" },
        { text: "hard", value: "&difficulty=hard" },
      ],
      difficultyString: "",
    };
  },
  methods: {
    setDifficulty(value) {
      this.difficultyString = value;
    },
  },
};
</script>

<style lang="scss">
@import "./styles/_globals.scss";

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $darkGray;

  .title {
    font-size: 6.25rem;
    font-weight: 400;
    color: $lightOrange;
  }

  .container {
    width: 100%;
    max-width: 33.75rem;
    border-radius: 0.625rem;
    background: $orangeGradient;
  }
}
</style>
