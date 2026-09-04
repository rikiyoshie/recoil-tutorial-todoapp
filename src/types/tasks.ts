export const TASK_STATUSES = ['today', 'in_progress', 'in_review', 'blocked', 'done'] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = 'high' | 'medium' | 'low';
export type EngineeringTask = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  project?: string;
  tags: string[];
  dueDate?: string;
  blockedReason?: string;
  createdAt: string;
};
// 旧Todo画面との互換性を保つため、移行が終わるまでは残す。
export type Tasks = Pick<EngineeringTask, 'id' | 'title'>;
