import React from "react";

export type TodoItem = {
  id: string;
  taskName: string;
  priority: number | null;
  deadline: Date | null;
  completed: boolean;
  completedAt: Date | null;
};

const timeStamp = new Date().getTime().toString();

const todoData: TodoItem[] = [
  {
    id: timeStamp,
    taskName: "掃除をする",
    priority: 1,
    deadline: new Date("2020-07-23"),
    completed: false,
    completedAt: null,
  },
  {
    id: timeStamp,
    taskName: "植物に水を上げる",
    priority: 2,
    deadline: new Date("2020-07-30"),
    completed: false,
    completedAt: null,
  },
  {
    id: timeStamp,
    taskName: "買い物をする",
    priority: null,
    deadline: null,
    completed: true,
    completedAt: new Date("2020-07-10"),
  },
  {
    id: timeStamp,
    taskName: "犬の散歩をする",
    priority: null,
    deadline: null,
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
  return (
    <div>
      <h2>Todo List</h2>
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
          {todoData.map((item, i) => {
            if (item.priority !== null && item.deadline !== null) {
              return (
                <tr key={i}>
                  <td>{item.taskName}</td>
                  <td>{getPriorityLabel(item.priority!)}</td>
                  <td>{item.deadline.toISOString().slice(0, 10)}</td>
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
              return null;
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
          {todoData.map((item, i) => {
            if (item.completed) {
              return (
                <tr key={i}>
                  <td>{item.taskName}</td>
                  <td>{item.completedAt!.toISOString().slice(0, 10)}</td>
                </tr>
              );
            } else {
              return null;
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
