import { TodoItem } from "app/todo/page";
import { NextResponse } from "next/server";

// Initial Todo Items
const initialItems: TodoItem[] = [
  {
    id: "58bfad23-3268-4034-a556-3a408f6ed890",
    taskName: "掃除をする",
    priority: 1,
    deadline: new Date("2020-07-23"),
    completed: false,
    // 修正点：TSではundefinedに統一
    completedAt: undefined,
  },
  {
    id: "040222b6-5fb9-4c0d-9bb3-ac2de103fb44",
    taskName: "植物に水を上げる",
    priority: 2,
    deadline: new Date("2020-07-30"),
    completed: false,
    completedAt: undefined,
  },
  {
    id: "06b12423-5949-46b4-8a3e-fa0552d5a7c4",
    taskName: "買い物をする",
    priority: undefined,
    deadline: undefined,
    completed: true,
    completedAt: new Date("2020-07-10"),
  },
  {
    id: "72a46246-cc3a-4e5e-b3e7-01b0dffcbb4d",
    taskName: "犬の散歩をする",
    priority: undefined,
    deadline: undefined,
    completed: true,
    completedAt: new Date("2020-06-29"),
  },
];

export const GET = async (request: Request) => {
  return NextResponse.json(initialItems);
};
