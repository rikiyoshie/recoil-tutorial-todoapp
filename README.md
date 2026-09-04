# Personal Engineering Task Manager

日々の開発タスクを、自分ひとりで素早く整理・確認するためのタスク状況管理ツールです。一般的なTodoリストではなく、エンジニアの仕事で頻出する「実装中」「レビュー待ち」「ブロッカー」を明示します。

## 現在確認できること

- 今日やること / 進行中 / レビュー待ち / ブロック中 / 完了
- タスクのクイック追加、検索、次ステータスへの更新
- 優先度、プロジェクト、タグ、期限、ブロック理由の表示

データは現在Recoilのメモリ上に保持されるため、再読み込みすると初期状態へ戻ります。

## 開発

```bash
npm install
npm run dev
```

品質確認は `npm run lint` と `npm run build` で行います。

## 構成

- `src/pages/TaskBoardPage.tsx`: メインのステータスボード
- `src/states/engineeringTasksState.ts`: タスク一覧と集計
- `src/types/tasks.ts`: ドメインモデルとステータス定義
- `docs/PRODUCT.md`: 方針・スコープ・ロードマップ

旧チュートリアル画面は移行期間中、`/todo` と `/grid` に残しています。
