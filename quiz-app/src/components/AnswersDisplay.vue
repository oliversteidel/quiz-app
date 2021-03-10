<template>
  <div class="wrapper flex-col ai-c">
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
    <button class="btn--next" @click="$emit('update-progress')">{{nextBtnText}}</button>
    <button class="btn--next" v-if="playerProgress === 10" @click="$emit('play-again')">play again</button>
  </div>
</template>

<script>
export default {
  name: "AnswersDisplay",
  props: ["answers", "correctAnswers", "playerProgress", "showOptions"],
  computed: {
    nextBtnText: function () {
      if(this.playerProgress < 9) {
        return "next question"
      }else{
        return "finish"
      }
    }
  },


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
        }, 500);
      }
      
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
  margin-bottom: 2rem;
}

.answer {
  list-style: none;
  width: 100%;
  max-width: 18.75rem;
  min-height: 3.125rem;
  padding: 0.5em 1em;
  margin-bottom: 1.5rem;
  background: $darkGray;
  border-radius: 0.625rem;
  font-family: "Londrina Solid", cursive;
  font-size: 1.25rem;
  font-weight: 300;
  color: $lightOrange;
  box-shadow: $shadow;
  cursor: pointer;
  transition: all 0.3s ease-in;

  @include breakpoint-up($medium) {
    font-size: 1.5rem;
  }
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

.btn--next {
  border: none;
  outline: none;
  width: 100%;
  max-width: 18.75rem;
  height: 3.75rem;
  padding: 0 1em;
  margin-bottom: 2rem;
  background: $darkGray;
  border-radius: 0.625rem;
  font-family: "Londrina Solid", cursive;
  font-size: 1.25rem;
  font-weight: 300;
  color: $lightOrange;
  box-shadow: $shadow;
  cursor: pointer;
  transition: all 0.3s ease-in;

  @include breakpoint-up($medium) {
    font-size: 1.5625rem;   
    height: 4.6875rem;
  }
}

.btn--next:hover {
  transform: scale(0.98);
}
</style>