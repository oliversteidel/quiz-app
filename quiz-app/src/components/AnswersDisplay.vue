<template>
  <div class="wrapper flex jc-c">
    <ul class="answer-list flex-col ai-c">
      <li
        class="answer flex ai-c jc-c"
        v-bind:playerProgress="playerProgress"        
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


  methods: {
    evaluateAnswer(event) {
      let playerAnswer = event.target.innerHTML.slice(1, -1);
      let veryfier = this.correctAnswers[this.playerProgress];
      if (playerAnswer === veryfier) {
        event.target.classList.add("correct");
        this.$emit('update-score');
      } else {
        event.target.classList.add("incorrect");
        setTimeout(() => {
          this.showCorrectAnswer();
        }, 1500);
      }
      this.$emit('update-progress');
    },
    showCorrectAnswer() {
      const answerElements = document.querySelectorAll(".answer");
      answerElements.forEach((el) => {
        if (
          el.innerHTML.slice(1, -1) === this.correctAnswers[this.playerProgress]
        ) {
          el.classList.add("correct");
        }
      });
    },
  },
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
  transition: transform 0.3s ease;
}

.answer:hover {
  transform: scale(0.98);
}

.correct {
  color: $green;
  border: 2px solid $green;
}

.incorrect {
  color: $red;
  border: 2px solid $red;
}
</style>