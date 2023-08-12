import { TodoItem } from "app/page";
import { TodoListItem } from "./TodoListItem";

// 修正点：Reactコンポーネントに渡す型をPropsでまとめる（質問：Propsでまとめるべきなのか）
interface TodoListTableProps {
  items: TodoItem[];
  editable: boolean;
}

// 修正点：todoDataをTableコンポーネントから渡すように変える
export const TodoListTable: React.FC<TodoListTableProps> = ({
  items,
  editable,
}) => {
  return (
    <div>
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
