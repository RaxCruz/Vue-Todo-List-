<template>
  <div class="d-flex">
    <label for="inputTask" class="">
      <input
        v-model.trim="inputText"
        type="text"
        id="inputTask"
        class="form-control"
        :placeholder="placeholder"
      />
    </label>
    <button class="btn btn-warning rounded-20" @click="submit">{{ buttonText }}</button>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    buttonText: String,
    initValue: String,
  },
  data() {
    return {
      inputText: this.initValue,
    };
  },
  methods: {
    submit() {
      const { inputText } = this;
      if (inputText.length === 0) {
        return;
      }

      this.$emit('submit', this.inputText);
    },
  },
};
</script>

<style lang="scss" scoped></style>
