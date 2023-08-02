"use client";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import TodoList from "./components/TodoList";

export type TodoItem = {
  id: string;
  taskName: string;
  // 修正点：Optional Propertyを用いること
  priority?: number;
  deadline?: Date;
  completed: boolean;
  completedAt?: Date;
};

const todoData: TodoItem[] = [
  {
    id: uuidv4(),
    taskName: "掃除をする",
    priority: 1,
    deadline: new Date("2020-07-23"),
    completed: false,
  },
  {
    id: uuidv4(),
    taskName: "植物に水を上げる",
    priority: 2,
    deadline: new Date("2020-07-30"),
    completed: false,
  },
  {
    id: uuidv4(),
    taskName: "買い物をする",
    priority: 2,
    deadline: new Date("2019-07-30"),
    completed: true,
    completedAt: new Date("2020-07-10"),
  },
  {
    id: uuidv4(),
    taskName: "犬の散歩をする",
    priority: 2,
    deadline: new Date("2018-07-30"),
    completed: true,
    completedAt: new Date("2020-06-29"),
  },
];

function TodoTable() {
  const incompleteItems = todoData.filter((item) => !item.completed);

  // 修正点：第一引数はtodoData、第二引数はtodoDate全体を書き換える関数、useStateの引数にはtodoDateを入れる
  const [todoItems, setTodoItems] = useState<TodoItem[]>(incompleteItems);
  const [task, setTask] = useState<string>("");

  const changeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const addTodoItems = () => {
    // e.preventDefault(); 必要かどうか不明
    if (!task.trim()) return;

    setTodoItems((todoItems) => [
      ...todoItems,
      { id: uuidv4(), taskName: task, completed: false },
    ]);

    setTask("");
  };

  return (
    <div>
      <h2>Todo List</h2>
      <table>
        <thead>
          <tr>
            <td>タスク名</td>
            <td>期限</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                value={task}
                onChange={changeTask}
                placeholder="入力欄"
              />
            </td>
            <td>
              <input type="text"></input>
            </td>
            <td>
              <button onClick={addTodoItems}>新規追加</button>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>タスク</th>
            <th>優先度</th>
            <th>期限</th>
            <th></th>
            <th></th>
            <th>完了</th>
          </tr>
        </thead>
        <tbody>
          {todoItems.map((item) => (
            <TodoList key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DoneTable() {
  const doneItems = todoData.filter((item) => item.completed);
  return (
    <div>
      <h2>Done</h2>
      <table>
        <thead>
          <tr>
            <th>タスク</th>
            <th>優先度</th>
            <th>期限</th>
            <th></th>
            <th></th>
            <th>完了日</th>
          </tr>
        </thead>
        <tbody>
          {doneItems.map((item) => (
            <TodoList key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Table() {
  return (
    <div>
      <TodoTable />
      <DoneTable />
    </div>
  );
}

export default Table;
