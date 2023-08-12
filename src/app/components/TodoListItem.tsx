import { TodoItem } from "app/page";

// 質問：page側で行ったProps定義と同様のものをコンポーネント側でも定義すべきなのか
interface TodoListItemProps {
  item: TodoItem;
}

function getPriorityLabel(priority?: number) {
  switch (priority) {
    case 1:
      return "高";
    case 2:
      return "中";
    case 3:
      return "低";
    // 修正点：undefinedを返す可能性がある場合には、defaultを設定
    default:
      return "-";
  }
}

// 修正点：default exportからnamed exportへ変更
export const TodoListItem: React.FC<TodoListItemProps> = ({ item }) => {
  return (
    // 修正点：Keyはmapの要素ではなく、item.idを用いる
    <tr key={item.id}>
      <td>{item.taskName}</td>
      {/* 修正点：item.priorityがundefinedかチェックした上でgetPriorityLabelを呼び出す */}
      <td>{getPriorityLabel(item.priority)}</td>
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
