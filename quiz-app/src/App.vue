<template>
  <div id="app">
    <h1 class="title">Do you know?</h1>
    <div class="container flex-col ai-c">
      <header
        class="header flex"
        v-bind:class="[showOptions ? 'jc-fe' : 'jc-sb']"
      >
        <transition name="fade-left">
          <ScoreDisplay v-bind:playerScore="playerScore" v-if="!showOptions" />
        </transition>
        <transition name="fade-left">
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
      <transition name="fade-right">
      <SelectDifficulty
        v-bind:diffOptions="diffOptions"
        v-on:send-difficulty="setDifficultyString"
        v-if="showOptions"
      />
      </transition>
      <transition name="fade-right">
      <SelectCategory
        v-bind:categoryOptions="categoryOptions"
        v-on:send-category="setCategoryString"
        v-if="showOptions"
      />
      </transition>
      <p class="error-message" v-if="apiCallFailed">
        No connection to database. Please try again later.
      </p>
      <transition name="fade-right">
      <StartBtn v-on:start-game="getQuestions" v-if="showOptions" />
      </transition>
      <transition name="fade-left">
      <QuestionDisplay
        v-if="requestSuccessful"
        v-bind:questions="questions"
        v-bind:playerProgress="playerProgress"
        v-bind:playerScore="playerScore"
      />
      </transition>
      <transition name="fade-left">
      <AnswersDisplay
        v-if="requestSuccessful"
        v-bind:answers="answers"
        v-bind:playerProgress="playerProgress"
        v-bind:correctAnswers="correctAnswers"
        v-on:update-progress="updateProgress"
        v-on:update-score="updateScore"
      />
      </transition>
    </div>
  </div>
</template>

<script>
import he from "he"; //library encodes/decodes special characters (&#34; => ")
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
    AnswersDisplay,
  },
  data() {
    return {
      sessionToken: "",
      showOptions: true,
      requestSuccessful: false,
      apiCallFailed: false,
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
      return `https://opentdb.com/api.php?amount=10${this.categoryString}${this.difficultyString}&type=multiple&token=${this.sessionToken}`;
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
    getSessionToken: async function () {
      const response = await fetch(
        "https://opentdb.com/api_token.php?command=request"
      );
      const token = await response.json();
      this.sessionToken = await token.token;
    },
    getQuestions: async function () {
      try {
        this.emptyQuestionsAndAnswers();
        const response = await fetch(this.api_url);
        const data = await response.json();
        console.log(data);
        data.results.forEach((element) => {
          this.questions.push(he.decode(element.question));
          let temp = [...element.incorrect_answers, element.correct_answer];
          temp.sort();
          let decodedAnswers = temp.map((el) => he.decode(el));
          this.answers.push(decodedAnswers);
          this.correctAnswers.push(he.decode(element.correct_answer));
        });
        this.showOptions = !this.showOptions;
        this.requestSuccessful = true;
      } catch (err) {
        console.log(err);
        this.apiCallFailed = true;
      }
    },
    updateProgress() {
      if (this.playerProgress < 10) {
        this.playerProgress++;
      } else {
        this.playerProgress = 0;
        this.showOptions = true;
        this.requestSuccessful = false;
      }
    },
    updateScore() {
      this.playerScore++;
    },
    emptyQuestionsAndAnswers() {
      this.questions = [];
      this.answers = [];
      this.correctAnswers = [];
    }
  },
  mounted: function () {
    this.getSessionToken();
  },
};
</script>

<style lang="scss">
@import "./styles/_globals.scss";

#app {
  width: 100vw;  
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $darkGray;

  .title {
    font-size: 6.25rem;
    font-weight: 400;
    margin: 1rem 0;
    color: $lightOrange;
  }

  .container {
    width: 100%;    
    max-width: 33.75rem;
    min-height: 90vh;
    padding: 2rem;
    border-radius: 0.625rem;
    background: $orangeGradient;
    overflow: hidden;

    .header {
      margin-bottom: 3rem;
      width: 100%;
      //overflow-x: hidden;
    }
  }
}

.fade-left-enter-active {
  transition: transform 0.5s ease-in;
}
.fade-left-leave-active {
  transition: transform 0.5s ease-out;
}

.fade-left-enter,
.fade-left-leave-to {
  transform: translate(-300%, 0);
}

.fade-right-enter-active {
  transition: transform 0.5s ease-in;
}
.fade-right-leave-active {
  transition: transform 0.5s ease-out;
}

.fade-right-enter,
.fade-right-leave-to {
  transform: translate(300%, 0);
}
</style>
