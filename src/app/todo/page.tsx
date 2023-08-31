"use client";

import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
// 修正点：default exportからnamed exportへ変更、{}でモジュール名を指定
import { TodoListItem } from "../components/TodoListItem";
import React from "react";
import { NewTodoItem } from "../components/NewTodoItem";
import { NextPage } from "next";
import { TodoListTable } from "../components/TodoListTable";

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

const TodoListPage: NextPage = ({}) => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        // 修正点：string型で受け取ったデータをTodoItemに合わせてDate型に変換する
        const convertedDate: TodoItem[] = data.map((item: any) => {
          return {
            id: item.id,
            taskName: item.taskName,
            priority: item.priority,
            deadline: item.deadline ? new Date(item.deadline) : undefined,
            completed: item.completedAt,
            completedAt: item.completedAt
              ? new Date(item.completedAt)
              : undefined,
          };
        });
        setTodoItems(convertedDate);
      })
      .catch((error) => console.error("API call error:", error));
  }, []);

  const incompleteItems = todoItems.filter((todoItems) => !todoItems.completed);
  const doneItems = todoItems.filter((todoItems) => todoItems.completed);

  const addTodoItems = (newTodoItem: TodoItem) => {
    setTodoItems((todoItems) => [...todoItems, newTodoItem]);
  };

  return (
    <div>
      <NewTodoItem onAddTodo={addTodoItems} />
      {/* 修正点：タイトルはTodoListTableコンポーネント外に出す */}
      <h2>Todo List</h2>
      {/* 修正点： 2つのTableを1つのコンポーネントに集約し、ediitable変数で切り替え*/}
      <TodoListTable items={incompleteItems} editable={true} />
      <h2>Done</h2>
      <TodoListTable items={doneItems} editable={false} />
    </div>
  );
};

export default TodoListPage;
