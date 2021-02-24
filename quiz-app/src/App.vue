<template>
  <div id="app">
    <h1 class="title">Do you know?</h1>
    <div class="container flex-col ai-c">
      <header
        class="header flex"
        v-bind:class="[showOptions ? 'jc-fe' : 'jc-sb']"
      >
        <transition name="fade">
          <ScoreDisplay v-bind:playerScore="playerScore" v-if="!showOptions" />
        </transition>
        <transition name="fade">
          <ProgressDisplay
            v-bind:playerProgress="playerProgress"
            v-if="!showOptions"
          />
        </transition>
        <OptionsBtn
          v-on:toggle-options="toggleOptions"
          v-bind:showOptions="showOptions"
        />
      </header>
      <SelectDifficulty
        v-bind:diffOptions="diffOptions"
        v-on:send-difficulty="setDifficultyString"
        v-if="showOptions"
      />
      <SelectCategory
        v-bind:categoryOptions="categoryOptions"
        v-on:send-category="setCategoryString"
        v-if="showOptions"
      />
      <StartBtn v-on:start-game="getQuestions" v-if="showOptions" />
      <QuestionDisplay
        v-if="requestSuccessful"
        v-bind:questions="questions"
        v-bind:playerProgress="playerProgress"
      />
      <AnswersDisplay 
      v-if="requestSuccessful"
      v-bind:answers="answers"
      v-bind:playerProgress="playerProgress"
      v-bind:correctAnswers="correctAnswers" />
    </div>
  </div>
</template>

<script>
import OptionsBtn from "./components/OptionsBtn";
import SelectDifficulty from "./components/SelectDifficulty";
import SelectCategory from "./components/SelectCategory";
import StartBtn from "./components/StartBtn";
import ScoreDisplay from "./components/ScoreDisplay";
import ProgressDisplay from "./components/ProgressDisplay";
import QuestionDisplay from "./components/QuestionDisplay";
import AnswersDisplay from "./components/AnswersDisplay";

export default {
  name: "App",
  components: {
    OptionsBtn,
    SelectDifficulty,
    SelectCategory,
    StartBtn,
    ScoreDisplay,
    ProgressDisplay,
    QuestionDisplay,
    AnswersDisplay
  },
  data() {
    return {
      showOptions: true,
      requestSuccessful: false,
      diffOptions: [
        { text: "easy", value: "&difficulty=easy" },
        { text: "medium", value: "&difficulty=medium" },
        { text: "hard", value: "&difficulty=hard" },
      ],
      categoryOptions: [
        { text: "general knowlege", value: "&category=9" },
        { text: "entertainment: film", value: "&category=11" },
      ],
      difficultyString: "&difficulty=easy",
      categoryString: "&category=9",
      playerScore: 0,
      playerProgress: 0,
      questions: [],
      answers: [],
      correctAnswers: [],
    };
  },
  computed: {
    api_url: function () {
      return `https://opentdb.com/api.php?amount=10${this.categoryString}${this.difficultyString}&type=multiple`;
    },
  },
  methods: {
    setDifficultyString(value) {
      this.difficultyString = value;
    },
    setCategoryString(value) {
      this.categoryString = value;
    },
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    getQuestions: async function () {
      const response = await fetch(this.api_url);
      const data = await response.json();
      data.results.forEach((element) => {
        this.questions.push(element.question);
        let temp = [...element.incorrect_answers, element.correct_answer];
        temp.sort();
        this.answers.push(temp);
        this.correctAnswers.push(element.correct_answer);
      });
      this.showOptions = !this.showOptions;
      this.requestSuccessful = true;
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
    padding: 2rem;
    border-radius: 0.625rem;
    background: $orangeGradient;
    overflow: hidden;

    .header {
      margin-bottom: 5rem;
      width: 100%;
      //overflow-x: hidden;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s ease-out;
}

.fade-enter,
.fade-leave-to {
  transform: translate(-300%, 0);
}
</style>
