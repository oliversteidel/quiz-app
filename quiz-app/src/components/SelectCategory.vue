<template>
  <div class="wrapper flex-col">
    <label for="select-category">select category</label>

    <select
      id="select-category"
      v-model="category"
      @change="$emit('send-category', category)"
    >
      <option
        v-for="option in categoryOptions"
        :key="option.value"
        v-bind:value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectCategory",
  props: ["categoryOptions"],
  data() {
    return {
      category: "",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_globals.scss";
</style>