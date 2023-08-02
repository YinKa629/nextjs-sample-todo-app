import { TodoItem } from "app/page";

interface TodoItemProps {
  item: TodoItem;
}

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

const TodoList: React.FC<TodoItemProps> = ({ item }) => {
  return (
    // 修正点：Keyはmapの要素ではなく、item.idを用いる
    <tr key={item.id}>
      <td>{item.taskName}</td>
      {/* 修正点：item.priorityがundefinedかチェックした上でgetPriorityLabelを呼び出す */}
      <td>
        {item.priority !== undefined ? getPriorityLabel(item.priority) : "-"}
      </td>
      <td>{item.deadline?.toISOString().slice(0, 10) ?? "-"}</td>
      <td>{!item.completed ? <button>編集</button> : ""}</td>
      <td>{!item.completed ? <button>削除</button> : ""}</td>
      <td>
        {!item.completed ? (
          <input type="checkbox" />
        ) : (
          item.completedAt?.toISOString().slice(0, 10)
        )}
      </td>
    </tr>
  );
};

export default TodoList;
