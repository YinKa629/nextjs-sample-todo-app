import { TodoItem } from "app/page";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface NewTodoItemProps {
  onAddTodo: (todo: TodoItem) => void;
}

export const NewTodoItem: React.FC<NewTodoItemProps> = ({ onAddTodo }) => {
  const [task, setTask] = useState<string>("");

  const Today = new Date();
  const [deadline, setDeadline] = useState(Today);

  const changeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const changeDeadline = (selectedDate: Date) => {
    const newDeadline = new Date(selectedDate);
    setDeadline(newDeadline);
  };

  const handleAddTodo = () => {
    if (!task.trim()) return;
    // 修正点：newTodoItemをNewTodoItemコンポーネント内で生成する
    const newTodoItem: TodoItem = {
      id: uuidv4(),
      taskName: task,
      deadline: deadline,
      completed: false,
    };
    onAddTodo(newTodoItem);
    setTask("");
    setDeadline(Today);
  };

  // TODO: CSSフレックスボックスに修正する
  return (
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
          {/* // 修正点：react-datepickerを用いてカレンダー形式で期限を設定できるようにする。初期値は当日。 */}
          <td>
            <DatePicker
              selected={deadline}
              onChange={changeDeadline}
              dateFormat="yyyy/MM/dd"
            />
          </td>
          <td>
            <button onClick={handleAddTodo}>新規追加</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
