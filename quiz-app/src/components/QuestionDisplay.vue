<template>
  <div class="wrapper">
    <p
      class="question"
      v-bind:questions="questions"
      v-bind:playerProgress="playerProgress"
    >
      {{ this.questions[this.playerProgress] }}
    </p>
    <transition name="fade-in">
      <p
        class="result"
        v-bind:playerProgress="playerProgress"
        v-if="playerProgress === 10"
      >
        {{ showResult }}
      </p>
    </transition>
  </div>
</template>

<script>
export default {
  name: "QuestionDisplay",
  data() {
    return {
      resultComments: {
        bad: "Well yes, nice try! You should consider reading a book.",
        good: "OK, there are actually things you know.",
        excellent: "Wow, you are the smartest person in front of this screen!",
      },
    };
  },
  props: ["questions", "playerProgress", "playerScore"],
  computed: {
    showResult: function () {
      if (this.playerScore < 4) {
        return this.resultComments.bad;
      } else if (this.playerScore >= 4 && this.playerScore < 7) {
        return this.resultComments.good;
      } else {
        return this.resultComments.excellent;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_globals.scss";

p {
  font-size: 1.4rem;
  color: $darkGray;
  margin-bottom: 2rem;
  font-weight: 400;
  opacity: 1;
  text-align: center;

  @include breakpoint-up($small) {
    font-size: 1.75rem;
  }

  @include breakpoint-up($medium) {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 3rem;
  }
}

.fade-in-enter-active {
  transition: opacity 0.4s ease-in;
}
.fade-in-leave-active {
  transition: opacity 0.4s ease-out;
}

.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
}
</style>