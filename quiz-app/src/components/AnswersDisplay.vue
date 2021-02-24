<template>
  <div class="wrapper flex jc-c">
    <ul class="answer-list flex-col ai-c">
      <li
        class="answer flex ai-c jc-c"
        v-bind:correctAnswers="correctAnswers"
        v-bind:playerProgress="playerProgress"
        v-bind:class="{ correct : isCorrect }"
        v-for="answer in answers[playerProgress]"
        :key="answer"
        @click="evaluateAnswer"
      >
        {{ answer }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AnswersDisplay",
  props: ["answers", "correctAnswers", "playerProgress"],
  data() {
      return {
          isCorrect: false
      }
  },
  methods: {
      evaluateAnswer() {
          console.log(this.answer);
          if(this.answer === this.correctAnswers[this.playerProgress]) {
              this.isCorrect = true;
          }
      }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/_globals.scss";

.wrapper {
    width: 100%;
}

.answer-list {
    width: 100%;
}

.answer {
  list-style: none;
  width: 100%;
  max-width: 18.75rem;
  height: 4.6875rem;
  padding: 0 1em;
  margin-bottom: 1rem;
  background: $darkGray;
  border-radius: 0.625rem;
  font-family: "Londrina Solid", cursive;
  font-size: 1.5625rem;
  font-weight: 300;
  color: $lightOrange;
  box-shadow: $shadow;  
  cursor: pointer;
  transition: transform .3s ease;
}

.answer:hover {
    transform: scale(0.98);
}

.correct {
    color: $green;
}

.incorrect {
    color: $red;
}


</style>