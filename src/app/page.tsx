" use client";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

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
    // 修正点：TSではundefinedに統一
    completedAt: undefined,
  },
  {
    id: uuidv4(),
    taskName: "植物に水を上げる",
    priority: 2,
    deadline: new Date("2020-07-30"),
    completed: false,
    completedAt: undefined,
  },
  {
    id: uuidv4(),
    taskName: "買い物をする",
    priority: undefined,
    deadline: undefined,
    completed: true,
    completedAt: new Date("2020-07-10"),
  },
  {
    id: uuidv4(),
    taskName: "犬の散歩をする",
    priority: undefined,
    deadline: undefined,
    completed: true,
    completedAt: new Date("2020-06-29"),
  },
];

function getPriorityLabel(priority: number) {
  switch (priority) {
    case 1:
      return "高";
    case 2:
      return "中";
    case 3:
      return "低";
  }
}

function TodoTable() {
  // 修正点：第一引数はtodoData、第二引数はtodoDate全体を書き換える関数、useStateの引数にはtodoDateを入れる
  const [todoItems, setTodoItems] = useState(todoData);
  const [task, setTask] = useState("");

  const addTodoItems = () => {
    setTodoItems((todoItems) => [
      ...todoItems,
      { id: uuidv4(), taskName: task, completed: false },
    ]);
    setTask("");
  };

  return (
    <div>
      <h2>Todo List</h2>
      {/* <form onSubmit={addTodoItems}>
        <input value={task} placeholder="入力欄" />
      </form> */}
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
          {todoItems.map((item) => {
            if (!item.completed) {
              return (
                // 修正点：Keyはmapの要素ではなく、item.idを用いる
                <tr key={item.id}>
                  <td>{item.taskName}</td>
                  <td>{getPriorityLabel(item.priority!)}</td>
                  <td>{item.deadline?.toISOString().slice(0, 10) ?? "-"}</td>
                  <td>
                    <button>編集</button>
                  </td>
                  <td>
                    <button>削除</button>
                  </td>
                  <td>
                    <input type="checkbox" />
                  </td>
                </tr>
              );
            } else {
              return undefined;
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

function DoneTable() {
  return (
    <div>
      <h2>Done</h2>
      <table>
        <thead>
          <tr>
            <th>タスク</th>
            <th>完了日</th>
          </tr>
        </thead>
        <tbody>
          {todoData.map((item) => {
            if (item.completed) {
              return (
                <tr key={item.id}>
                  <td>{item.taskName}</td>
                  <td>{item.completedAt?.toISOString().slice(0, 10) ?? "-"}</td>
                </tr>
              );
            } else {
              return undefined;
            }
          })}
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
