<template>
  <div id="app">
    <h1 class="title">Do you know?</h1>
    <div class="container flex-col ai-c">
      <header class="header">
        <OptionsBtn />
      </header>
      <SelectDifficulty
      v-bind:diffOptions="diffOptions"
      v-on:send-difficulty="setDifficultyString"
       />
       <SelectCategory
       v-bind:categoryOptions="categoryOptions"
       v-on:send-category="setCategoryString" />
       
    </div>
  </div>
</template>

<script>
import OptionsBtn from "./components/OptionsBtn";
import SelectDifficulty from "./components/SelectDifficulty";
import SelectCategory from "./components/SelectCategory";

export default {
  name: "App",
  components: {
    OptionsBtn,
    SelectDifficulty,
    SelectCategory
  },
  data() {
    return {
      showOptions: true,
      diffOptions: [
        { text: "easy", value: "&difficulty=easy" },
        { text: "medium", value: "&difficulty=medium" },
        { text: "hard", value: "&difficulty=hard" },
      ],
      categoryOptions: [
        {text: "general knowlege", value: "&category=9"},
        {text: "entertainment: film", value: "&category=11"}
      ],
      difficultyString: "&difficulty=easy",
      categoryString: "&category=9",
    };
  },
  computed: {
    api_url: function () {
      return `https://opentdb.com/api.php?amount=10${this.categoryString}${this.difficultyString}`
    }
  },
  methods: {
    setDifficultyString(value) {
      this.difficultyString = value;
    },
    setCategoryString(value) {
      this.categoryString = value;
    }
  }
  
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
    padding: 2rem;
    border-radius: 0.625rem;
    background: $orangeGradient;

    .header {
      margin-bottom: 5rem;
    }
  }
}
</style>
