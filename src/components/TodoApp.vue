<template>
  <div class="container">
    <h1 class="text-center">TodoList</h1>
    <todo-button placeholder="代辦事項" buttonText="新增" :isEdit="false" newTask="" @submit="submitTask"></todo-button>
    <todo-items :tasks="todos" :editIndex="editIndex" @editTasks="editTasks" @deleteTask="deleteTask"
      @checkTask="checkTask" @submitTask="submitTask" @submitEditTask="submitEditTask"></todo-items>
  </div>
</template>

<script>
import axios from 'axios';
import TodoItems from './TodoItems.vue';
import TodoButton from './TodoButton.vue';

axios.defaults.baseURL = '/api';
export default {
  components: { TodoItems, TodoButton },
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      newTask: '', // 新任務內容
      editIndex: -1, // 更改任務的編號
      checked: false, // 更改任務的編號

      tasks: [
        {
          name: '洗衣服',
          isComplete: true,
        },
        {
          name: '修理郵筒',
          isComplete: false,
        },
        {
          name: '倒垃圾',
          isComplete: false,
        },
      ],
      todos: [],
    };
  },
  created() {
    this.getTodos();
    console.log(this.todos);
  },
  methods: {
    backToLogin() {
      this.$emit('backToLogin');
    },
    async getTodos() {
      const res = await axios.get('/todos');
      this.todos = res.data.todos;
    },
    async getTodo(id) {
      const res = await axios.get(`/todos/${id}`);
      return res.data.todo;
    },
    async submitTask(payload) {
      // 新增代辦事項
      this.tasks.push({
        name: payload,
        isComplete: false,
      });
      const res = await axios.post(
        `/todos`,
        {
          name: payload,
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      );
      console.log(res.data)
      if (res.data.error_code === "login error") this.backToLogin()
      this.todos = res.data.todos;
    },
    async deleteTask(index) {
      // 刪除按鈕
      const { id } = this.todos[index];
      const res = await axios.delete(`/todos/${id}`);
      if (res.data.error_code === "login error") this.backToLogin()
      this.todos = res.data.todos;
    },
    editTasks(index) {
      // 修改按鈕
      this.editIndex = index;
      this.editTask = this.tasks[index].name;
    },
    async submitEditTask(payload) {
      // 完成更新事項
      this.tasks[this.editIndex].name = payload;
      const { id } = this.todos[this.editIndex];
      const res = await axios.put(
        `/todos/${id}`,
        {
          name: payload,
          isComplete: false,
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      );
      if (res.data.error_code === "login error") this.backToLogin()
      this.todos = res.data.todos;
      this.editIndex = -1;
    },
    async checkTask(index) {
      // 狀態更改
      this.tasks[index].isComplete = !this.tasks[index].isComplete;
      const { id } = this.todos[index];
      const { name } = this.todos[index];
      const res = await axios.put(
        `/todos/${id}`,
        {
          name,
          isComplete: false,
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      );
      if (res.data.error_code === "login error") this.backToLogin()
      this.todos = res.data.todos;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
