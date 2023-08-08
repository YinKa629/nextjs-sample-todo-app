"use client";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
// 修正点：default exportからnamed exportへ変更、{}でモジュール名を指定
import { TodoListItem } from "./components/TodoListItem";
import React from "react";
import { NewTodoItem } from "./components/NewTodoItem";

export type TodoItem = {
  id: string;
  taskName: string;
  // 修正点：Optional Propertyを用いること
  priority?: number;
  deadline?: Date;
  completed: boolean;
  completedAt?: Date;
};

// 修正点：Reactコンポーネントに渡す型をPropsでまとめる（質問：Propsでまとめるべきなのか）
interface TodoTableProps {
  items: TodoItem[];
  editable: boolean;
}

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

// 修正点：todoDataをTableコンポーネントから渡すように変える
export const TodoTable: React.FC<TodoTableProps> = ({ items, editable }) => {
  // 修正点：第一引数はtodoData、第二引数はtodoDate全体を書き換える関数、useStateの引数にはtodoDateを入れる
  // const [todoItems, setTodoItems] = useState<TodoItem[]>(items);

  // const addTodoItems = (task: string) => {
  //   if (!task.trim()) return;

  //   setTodoItems((todoItems) => [
  //     ...todoItems,
  //     { id: uuidv4(), taskName: task, completed: false },
  //   ]);
  // };

  return (
    <div>
      <h2>Todo List</h2>
      {/* {editable && <NewTodoItem onAddTodo={addTodoItems} />} */}
      <table>
        <thead>
          <tr>
            <th>タスク</th>
            <th>優先度</th>
            <th>期限</th>
            <th></th>
            <th></th>
            <th>{editable ? "完了" : "完了日"}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <TodoListItem key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Table: React.FC<TodoTableProps> = ({}) => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>(todoData);

  const incompleteItems = todoItems.filter((todoItems) => !todoItems.completed);
  const doneItems = todoItems.filter((todoItems) => todoItems.completed);

  const addTodoItems = (task: string) => {
    if (!task.trim()) return;

    setTodoItems((todoItems) => [
      ...todoItems,
      { id: uuidv4(), taskName: task, completed: false },
    ]);
  };

  return (
    <div>
      {/* 修正点： 2つのTableを1つのコンポーネントに集約し、ediitable変数で切り替え*/}
      <NewTodoItem onAddTodo={addTodoItems} />
      <TodoTable items={incompleteItems} editable={true} />
      <TodoTable items={doneItems} editable={false} />
    </div>
  );
};

// 質問：export const Tableやexportせずにconst Tableでは動かないのはなぜですか。
export default Table;
