<template>
  <div class="wrapper">
    <p
      class="question"
      v-bind:questions="questions"
      v-bind:playerProgress="playerProgress"
    >
      {{ this.questions[this.playerProgress] }}
    </p>
    <p class="result" v-bind:playerProgress="playerProgress" v-if="playerProgress === 10">{{showResult}}</p>
  </div>
</template>

<script>
export default {
  name: "QuestionDisplay",
  data() {
    return {
      resultComments: [
        { bad: "Well yes, nice try! You should consider reading a book." },
        { good: "OK, there are actually things you know." },
        { excellent: "Wow, you are the smartest person in front of this screen!" },
      ],
    };
  },
  props: ["questions", "playerProgress", "playerScore"],
  computed: {
    showResult: function () {
      if ( this.playerScore < 4 ) {
        return this.resultComments[0].bad;
      } else if ( this.playerScore > 4 && this.playerScore < 7 ) {
        return this.resultComments[1].good;
      } else {          
        return this.resultComments[2].excellent;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_globals.scss";

p {
  font-size: 2rem;
  color: $darkGray;
  margin-bottom: 3rem;
}
</style>