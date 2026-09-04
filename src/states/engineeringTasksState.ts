import { atom, selector } from 'recoil';
import type { EngineeringTask, TaskStatus } from '../types/tasks';

const initialTasks: EngineeringTask[] = [
  {
    id: 'task-1',
    title: '認証APIのエラーハンドリングを整理',
    status: 'today',
    priority: 'high',
    project: 'Developer Portal',
    tags: ['backend', 'API'],
    dueDate: '今日',
    createdAt: '2026-09-02T09:00:00+09:00',
  },
  {
    id: 'task-2',
    title: 'ダッシュボードのレスポンシブ対応',
    status: 'in_progress',
    priority: 'medium',
    project: 'Task Manager',
    tags: ['frontend'],
    createdAt: '2026-09-01T14:00:00+09:00',
  },
  {
    id: 'task-3',
    title: 'キャッシュ戦略のPRを確認してもらう',
    status: 'in_review',
    priority: 'medium',
    project: 'Platform',
    tags: ['PR #142', 'infra'],
    createdAt: '2026-09-01T16:30:00+09:00',
  },
  {
    id: 'task-4',
    title: 'ステージング環境の権限を申請',
    status: 'blocked',
    priority: 'high',
    project: 'Platform',
    tags: ['infra'],
    blockedReason: '管理者の承認待ち',
    createdAt: '2026-08-31T11:00:00+09:00',
  },
  {
    id: 'task-5',
    title: 'リリースノートを更新',
    status: 'done',
    priority: 'low',
    project: 'Developer Portal',
    tags: ['docs'],
    createdAt: '2026-08-30T10:00:00+09:00',
  },
];

export const engineeringTasksState = atom<EngineeringTask[]>({
  key: 'engineeringTasksState',
  default: initialTasks,
});
export const taskCountByStatusState = selector<Record<TaskStatus, number>>({
  key: 'taskCountByStatusState',
  get: ({ get }) =>
    get(engineeringTasksState).reduce<Record<TaskStatus, number>>(
      (counts, task) => ({ ...counts, [task.status]: counts[task.status] + 1 }),
      { today: 0, in_progress: 0, in_review: 0, blocked: 0, done: 0 },
    ),
});
