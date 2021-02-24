<template>
    <p class="question"
    v-bind:questions="questions"
    v-bind:playerProgress="playerProgress">
        {{this.questions[this.playerProgress]}}
    </p>
</template>

<script>
export default {
    name: 'QuestionDisplay',
    props: [ 'questions', 'playerProgress' ]
}
</script>

<style lang="scss" scoped>
@import "../styles/_globals.scss";

.question {
    font-size: 2rem;
    color: $darkGray;
    margin-bottom: 3rem;
}

</style>