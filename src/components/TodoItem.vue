<template>
  <tr>
    <td>{{ index }}</td>
    <td scope="row" v-if="isEditing">
      <todo-button
        placeholder="代辦事項"
        buttonText="確認更改"
        @submit="submitEditTask"
        :initValue="task.name"
      ></todo-button>
    </td>
    <td scope="row" v-else>{{ task.name }}</td>
    <td v-bind:class="{ 'text-danger': task.isComplete, 'text-success': !task.isComplete }">
      {{ task.isComplete ? '完成' : '進行中' }}
    </td>
    <td>
      <button class="text-center" @click="deleteTask(index)">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </td>
    <td>
      <button class="text-center" @click="editTasks(index)">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
    </td>
    <td>
      <label class="form-check-label" :for="'checkInput' + index">
        <input
          class="form-check-input"
          type="checkbox"
          :id="'checkInput' + index"
          @change="checkTask(index)"
          :checked="task.isComplete"
        />
      </label>
    </td>
  </tr>
</template>

<script>
import TodoButton from './TodoButton.vue';

export default {
  components: { TodoButton },
  props: {
    index: Number,
    isEditing: Boolean,
    task: Object,
  },
  methods: {
    editTasks(index) {
      this.$emit('editTasks', index);
    },
    deleteTask(index) {
      this.$emit('deleteTask', index);
    },
    submitEditTask(payload) {
      this.$emit('submitEditTask', payload);
    },
    checkTask(index) {
      this.$emit('checkTask', index);
    },
  },
};
</script>

<style lang="scss" scoped></style>
