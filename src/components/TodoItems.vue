<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">事項</th>
        <th scope="col">狀態</th>
        <th scope="col">刪除</th>
        <th scope="col">修改</th>
        <th scope="col">完成</th>
      </tr>
      <todo-item
        v-for="(task, index) in tasks"
        :key="index"
        :index="index"
        :task="task"
        :taskName="tasks[index].name"
        :isEditing="index === editIndex"
        @editTasks="editTasks"
        @deleteTask="deleteTask"
        @checkTask="checkTask"
        @submitTask="submitTask"
        @submitEditTask="submitEditTask"
      ></todo-item>
    </thead>
    <tbody></tbody>
  </table>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
  props: {
    tasks: Array,
    editIndex: Number,
  },
  components: { TodoItem },
  methods: {
    editTasks(index) {
      this.$emit('editTasks', index);
    },
    deleteTask(index) {
      this.$emit('deleteTask', index);
    },
    submitTask(payload) {
      this.$emit('submitTask', payload);
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
