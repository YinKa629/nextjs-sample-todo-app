import { NextResponse } from "next/server";

type TodoItemJsonData = {
  id: string;                 // UUID
  taskName: string;
  priority: number | null;
  deadline: string | null;    // ISO 8601 String
  completed: boolean;
  completedAt: string | null, // ISO 8601 String
}

// Initial Todo Items
const initialItems: TodoItemJsonData[] = [
  {
    id: "58bfad23-3268-4034-a556-3a408f6ed890",
    taskName: "掃除をする",
    priority: 1,
    deadline: "2020-07-23T00:00:00.000Z",
    completed: false,
    completedAt: null,
  },
  {
    id: "040222b6-5fb9-4c0d-9bb3-ac2de103fb44",
    taskName: "植物に水を上げる",
    priority: 2,
    deadline: "2020-07-30T00:00:00.000Z",
    completed: false,
    completedAt: null,
  },
  {
    id: "06b12423-5949-46b4-8a3e-fa0552d5a7c4",
    taskName: "買い物をする",
    priority: null,
    deadline: null,
    completed: true,
    completedAt: "2020-07-10T00:00:00.000Z",
  },
  {
    id: "72a46246-cc3a-4e5e-b3e7-01b0dffcbb4d",
    taskName: "犬の散歩をする",
    priority: null,
    deadline: null,
    completed: true,
    completedAt: "2020-06-29T00:00:00.000Z",
  },
];

export const GET = async (request: Request) => {
  return NextResponse.json(initialItems);
};
