import { TodoItem } from "app/page";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface NewTodoItemProps {
  onAddTodo: (task: string) => void;
}

export const NewTodoItem: React.FC<NewTodoItemProps> = ({ onAddTodo }) => {
  const [task, setTask] = useState<string>("");

  const changeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleAddTodo = () => {
    onAddTodo(task);
    setTask("");
  };

  return (
    <>
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
            <input type="text" />
          </td>
          <td>
            <button onClick={handleAddTodo}>新規追加</button>
          </td>
        </tr>
      </tbody>
    </>
  );
};
