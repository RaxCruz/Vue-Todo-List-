const express = require('express');
const cors = require('cors');
const session = require('express-session')

const todos = [
  { id: 0, name: '修理紗窗', isComplete: false },
  { id: 1, name: '修馬桶', isComplete: false },
  { id: 2, name: '洗衣服', isComplete: false },
];
const TIMEOUT = 600 * 1000//10分鐘到期
const accounts = { account: '123', password: '123' };
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'mySecret',
  name: 'user', // optional
  saveUninitialized: false,
  resave: true,
  cookie: { maxAge: TIMEOUT } //10分鐘到期

}))
app.use((req, res, next) => {
  console.log(req.session)
  const now = Date.now()
  if (!req.session.ts) {  //還沒有值 或 過期

  }
  else {
    req.session.ts = Date.now(); // 更新
  }
  console.log(req.body.account)
  if (req.body.account || req.body.password || req.session.isLoggedIn) next()
  else res.json({
    status: 'ok',
    error_code: 'login error',
    msg: '',
    isLogin: 'false'
  })
}
)
app.get('/login', (req, res) => {
  const response = {
    status: 'ok',
    msg: '登入',
    isLogin: false,
  };
  if (req.session.isLoggedIn === true) {
    console.log('使用者登入');
    response.isLogin = true;
  }
  res.json(response);
});
// 登入
app.post('/login', (req, res) => {
  const response = {
    status: 'ok',
    msg: '登入',
    isLogin: false,
  };
  if (req.session.isLoggedIn || req.body.account === accounts.account && req.body.password === accounts.password) {
    console.log('以登入');
    req.session.isLoggedIn = true
    response.isLogin = true;
  }
  else req.session.isLoggedIn = false


  res.json(response);
});

// 取得 todo item
app.get('/todos/:id', (req, res) => {
  const response = {
    status: 'ok',
    msg: '取得 todo item',
    todo: [],
  };
  todos.forEach((todo) => {
    if (todo.id === Number(req.params.id)) {
      response.todo = todo;
    }
  });
  res.json(response);
});

// 取得 todo all items
app.get('/todos', (req, res) => {
  const response = {
    status: 'ok',
    msg: '取得 todo all items',
    todos: [],
  };
  response.todos = todos;
  res.json(response);
});

// 新增 todo  item
app.post('/todos', (req, res) => {
  const response = {
    status: 'ok',
    msg: '新增 todo item',
    todos: [],
  };
  const todo = { id: todos[todos.length - 1].id + 1, ...req.body, isComplete: false };
  todos.push(todo);
  response.todos = todos;
  res.json(response);
});

// 刪除 todo  item
app.delete('/todos/:id', (req, res) => {
  const response = {
    status: 'ok',
    msg: '刪除 todo item',
    todos: [],
  };
  todos.forEach((todo, index) => {
    if (todo.id === Number(req.params.id)) {
      todos.splice(index, 1);
      response.todos = todos;
    }
  });
  res.json(response);
});

// 更新 todo  item
app.put('/todos/:id', (req, res) => {
  const response = {
    status: 'ok',
    msg: '刪除 todo item',
    todos: [],
  };
  todos.forEach((todo, index) => {
    if (todo.id === Number(req.params.id)) {
      todos[index].isComplete = req.body.isComplete;
      todos[index].name = req.body.name;
      response.todos = todos;
    }
  });
  console.log(todos);
  res.json(response);
});



app.listen(3000, () => console.log('server is running'));
