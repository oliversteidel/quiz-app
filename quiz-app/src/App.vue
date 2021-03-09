<template>
  <div id="app">
    <h1 class="title">Do you know?</h1>
    <div class="container flex-col ai-c">
      <header class="header flex jc-sb">
        <ScoreDisplay
          v-bind:playerScore="playerScore"
          v-bind:showOptions="showOptions"
        />

        <ProgressDisplay
          v-bind:playerProgress="playerProgress"
          v-bind:showOptions="showOptions"
        />

        <OptionsBtn
          v-on:toggle-options="toggleOptions"
          v-bind:showOptions="showOptions"
        />
      </header>
      <div class="outer-wrapper">
        <div class="inner-wrapper flex" v-bind:showOptions="showOptions" v-bind:class="{ 'active' : showOptions}">
          <div class="options-container flex-col ai-c">
            <SelectDifficulty
              v-bind:diffOptions="diffOptions"
              v-on:send-difficulty="setDifficultyString"
            />

            <SelectCategory
              v-bind:categoryOptions="categoryOptions"
              v-on:send-category="setCategoryString"
            />

            <p class="error-message" v-if="apiCallFailed">
              {{ errorMessage }}
            </p>

            <StartBtn v-on:start-game="getQuestions" />
          </div>

          <div class="q-a-container flex-col ai-c">
            <transition name="fade-left">
            <QuestionDisplay
              v-bind:questions="questions"
              v-bind:playerProgress="playerProgress"
              v-bind:playerScore="playerScore"
              v-bind:key="rerenderKeyQ"
              v-on:update-progress="forceRerender"
              v-if="requestSuccessful"
            />
            </transition>

            <transition name="fade-left">
            <AnswersDisplay
              v-bind:answers="answers"
              v-bind:playerProgress="playerProgress"
              v-bind:correctAnswers="correctAnswers"
              v-bind:key="rerenderKeyA"
              v-on:update-progress="[updateProgress(), forceRerender()]"
              v-on:update-score="updateScore"
              v-on:play-again="[updateProgress(), getQuestions()]"
              v-if="requestSuccessful"
            />
            </transition>
          </div>
        </div>
      </div>
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
      apiResponseCode: 0,
      errorMessage: "",
      diffOptions: [
        { text: "easy", value: "&difficulty=easy" },
        { text: "medium", value: "&difficulty=medium" },
        { text: "hard", value: "&difficulty=hard" },
      ],
      categoryOptions: [
        { text: "general knowlege", value: "&category=9" },
        { text: "books", value: "&category=10" },
        { text: "film", value: "&category=11" },
        { text: "music", value: "&category=12" },
        { text: "musicals & theatre", value: "&category=13" },
        { text: "television", value: "&category=14" },
        { text: "video games", value: "&category=15" },
        { text: "board games", value: "&category=16" },
        { text: "science & nature", value: "&category=17" },
        { text: "science: computers", value: "&category=18" },
        { text: "science: mathematics", value: "&category=19" },
        { text: "mythology", value: "&category=20" },
        { text: "sports", value: "&category=21" },
        { text: "geography", value: "&category=22" },
        { text: "history", value: "&category=23" },
        { text: "politics", value: "&category=24" },
        { text: "art", value: "&category=25" },
        { text: "celebrities", value: "&category=26" },
        { text: "animals", value: "&category=27" },
        { text: "vehicles", value: "&category=28" },
      ],

      difficultyString: "&difficulty=easy",
      categoryString: "&category=9",
      playerScore: 0,
      playerProgress: 0,
      questions: [],
      answers: [],
      correctAnswers: [],
      rerenderKeyQ: 0,
      rerenderKeyA: 1,
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
      if (this.questions.length !== 0) {
        this.showOptions = !this.showOptions;
        this.requestSuccessful = !this.requestSuccessful;
      }
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
        //reset conditional values
        this.apiCallFailed = false;
        this.playerScore = 0;
        this.playerProgress = 0;
        this.emptyQuestionsAndAnswers();

        //fetch data form api
        const response = await fetch(this.api_url);
        const data = await response.json();
        console.log(data);

        //check api response-code
        //response codes:
        // Code 0: Success - Returned results successfully.
        // Code 1: No Results - Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)
        // Code 2: Invalid Parameter Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)
        // Code 3: Token Not Found - Session Token does not exist.
        // Code 4: Token Empty - Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.
        this.apiResponseCode = data.response_code;
        if (data.response_code === 4) {
          this.apiCallFailed = true;
          this.errorMessage =
            "Can't find questions. Try changing the difficulty or select another category.";
          return;
        }

        data.results.forEach((element) => {
          this.questions.push(he.decode(element.question));
          let temp = [...element.incorrect_answers, element.correct_answer];
          //sort answers alphabetically, that correct answer is not at the same index constantly
          temp.sort();

          let decodedAnswers = temp.map((el) => he.decode(el));
          this.answers.push(decodedAnswers);
          this.correctAnswers.push(he.decode(element.correct_answer));
        });
        //toggle options display and show QuestionsDisplay and AnswersDisplay
        this.showOptions = !this.showOptions;
        this.requestSuccessful = true;
      } catch (err) {
        console.log(err);
        this.apiCallFailed = true;
        this.errorMessage =
          "No connection to database. Please try again later.";
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
    },
    forceRerender() {
      this.rerenderKeyQ += 1;
      this.rerenderKeyA += 1;
    },
  },
  mounted() {
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
  padding: 0 1rem;
  background: $darkGray;

  .title {
    font-size: 2.75rem;
    font-weight: 400;
    margin: 1rem 0;
    color: $lightOrange;

    @include breakpoint-up($medium) {
      font-size: 5rem;
    }
  }

  .container {
    width: 100%;
    max-width: 33.75rem;
    min-height: 90vh;
    padding: 1rem;
    border-radius: 0.625rem;
    background: $orangeGradient;
    overflow: hidden;

    .header {
      margin-bottom: 1.5rem;
      width: 100%;

      @include breakpoint-up($medium) {
        margin-bottom: 3rem;
      }
    }

    .outer-wrapper {
      width: 100%;
      overflow-x: hidden;

      .inner-wrapper {
        width: 200%;
        transition: transform .75s ease-in;
        
        .options-container {
          width: 50%;
          order: 2;
          
        }

        .q-a-container {
          width: 50%;
          order: 1;
        }
      }
    }

    .active {
          transform: translateX(-50%);
        }

    .error-message {
      font-size: 2rem;
      color: $darkGray;
      margin-bottom: 3rem;
    }
  }
}

.fade-left-enter-active {
  transition: transform 0.6s ease-in;
}
.fade-left-leave-active {
  transition: opacity 0.2s ease-out;  
}

.fade-left-enter {
  transform: translateX(-100%);
  opacity: 1;
}

.fade-left-leave-to {
  transform: translateX(100%);
  opacity: 0;
}


</style>
