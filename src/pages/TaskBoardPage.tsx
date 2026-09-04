import { useMemo, useState, type FormEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { engineeringTasksState, taskCountByStatusState } from '../states/engineeringTasksState';
import { TASK_STATUSES, type EngineeringTask, type TaskStatus } from '../types/tasks';
import './TaskBoardPage.css';

const statusMeta: Record<TaskStatus, { label: string; eyebrow: string }> = {
  today: { label: '今日やること', eyebrow: 'FOCUS' },
  in_progress: { label: '進行中', eyebrow: 'IN PROGRESS' },
  in_review: { label: 'レビュー待ち', eyebrow: 'IN REVIEW' },
  blocked: { label: 'ブロック中', eyebrow: 'BLOCKED' },
  done: { label: '完了', eyebrow: 'DONE' },
};
const priorityLabel: Record<EngineeringTask['priority'], string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};
const nextStatus = (status: TaskStatus): TaskStatus =>
  TASK_STATUSES[Math.min(TASK_STATUSES.indexOf(status) + 1, TASK_STATUSES.length - 1)];
const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `task-${Date.now()}`;

const TaskBoardPage = () => {
  const [tasks, setTasks] = useRecoilState(engineeringTasksState);
  const counts = useRecoilValue(taskCountByStatusState);
  const [title, setTitle] = useState('');
  const [query, setQuery] = useState('');
  const visibleTasks = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return tasks;
    return tasks.filter((task) =>
      [task.title, task.project, ...task.tags]
        .filter(Boolean)
        .some((value) => value?.toLocaleLowerCase().includes(normalizedQuery)),
    );
  }, [query, tasks]);

  const addTask = (event: FormEvent) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    setTasks((currentTasks) => [
      {
        id: createId(),
        title: trimmedTitle,
        status: 'today',
        priority: 'medium',
        tags: [],
        createdAt: new Date().toISOString(),
      },
      ...currentTasks,
    ]);
    setTitle('');
  };
  const advanceTask = (task: EngineeringTask) =>
    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === task.id ? { ...item, status: nextStatus(item.status) } : item,
      ),
    );

  return (
    <main className="workspace">
      <header className="workspaceHeader">
        <div>
          <p className="productLabel">PERSONAL ENGINEERING TASK MANAGER</p>
          <h1>今日の開発を、前に進める。</h1>
          <p className="headerDescription">
            実装・レビュー・ブロッカーをひとつの流れで把握します。
          </p>
        </div>
        <div className="headerStats" aria-label="タスクのサマリー">
          <span>
            <strong>{counts.today + counts.in_progress}</strong> Active
          </span>
          <span>
            <strong>{counts.blocked}</strong> Blocked
          </span>
          <span>
            <strong>{counts.done}</strong> Done
          </span>
        </div>
      </header>
      <section className="toolbar" aria-label="タスク操作">
        <form className="quickAdd" onSubmit={addTask}>
          <span aria-hidden="true">＋</span>
          <input
            aria-label="新しいタスク"
            onChange={(event) => setTitle(event.target.value)}
            placeholder="今日やるタスクを追加..."
            value={title}
          />
          <button type="submit">追加</button>
        </form>
        <input
          className="searchInput"
          aria-label="タスクを検索"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="タスク・プロジェクト・タグを検索"
          type="search"
          value={query}
        />
      </section>
      <section className="board" aria-label="ステータス別タスクボード">
        {TASK_STATUSES.map((status) => {
          const columnTasks = visibleTasks.filter((task) => task.status === status);
          return (
            <section className={`boardColumn boardColumn--${status}`} key={status}>
              <header className="columnHeader">
                <div>
                  <span className="columnEyebrow">{statusMeta[status].eyebrow}</span>
                  <h2>{statusMeta[status].label}</h2>
                </div>
                <span className="taskCount">{columnTasks.length}</span>
              </header>
              <div className="taskList">
                {columnTasks.map((task) => (
                  <article className="taskCard" key={task.id}>
                    <div className="taskMeta">
                      <span className={`priority priority--${task.priority}`}>
                        {priorityLabel[task.priority]}
                      </span>
                      {task.project && <span className="project">{task.project}</span>}
                    </div>
                    <h3>{task.title}</h3>
                    {task.blockedReason && <p className="blockedReason">⚠ {task.blockedReason}</p>}
                    <div className="tagList">
                      {task.tags.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                    <footer className="taskFooter">
                      <span>{task.dueDate ?? '期限なし'}</span>
                      {task.status !== 'done' && (
                        <button type="button" onClick={() => advanceTask(task)}>
                          次へ →
                        </button>
                      )}
                    </footer>
                  </article>
                ))}
                {columnTasks.length === 0 && <p className="emptyState">タスクはありません</p>}
              </div>
            </section>
          );
        })}
      </section>
    </main>
  );
};
export default TaskBoardPage;
