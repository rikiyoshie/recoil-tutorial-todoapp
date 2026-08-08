# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド

- `npm run dev` — Vite開発サーバーを起動
- `npm run build` — `tsc -b` で型チェック後、`vite build` で本番ビルド
- `npm run lint` — ESLintを実行
- `npm run preview` — 本番ビルドをローカルでプレビュー

このプロジェクトにテストランナーは設定されていない。

## アーキテクチャ

Recoilによる状態管理を学習するためのチュートリアルアプリ（React + TypeScript + Vite）。react-router-domは依存関係にあるが、`src/App.tsx`内の`Routes`/`Route`はコメントアウトされており未使用。

- `src/App.tsx` — `RecoilRoot`でアプリ全体をラップし、トップレベルのコンポーネント（`InputTask`、`AddTask`、`AgGridReactTable`）を並べる。
- **状態管理（`src/states/`）**: Recoilのatom/selectorを1状態1ファイルで定義。
  - `inputTitleState.ts` — テキスト入力中の値を保持するatom。
  - `addTitleState.ts` — 追加済みタスクの配列（`Tasks[]`）を保持するatomと、その件数を導出する`addTitleStateLength`セレクタ。
- **型定義（`src/types/tasks.ts`）**: `Tasks`型（`{ id: string; title: string }`）。stateとcomponents両方で共有。
- **コンポーネント（`src/components/`）**:
  - `InputTask` — `inputTitleState`の読み書きを行い、追加ボタン押下時に`Math.random().toString(32)`でid生成した新規タスクを`addTitleState`に追加し、入力欄をクリアする。
  - `AddTask` — `addTitleState`と`addTitleStateLength`を読み取り、タスク一覧を表示専用でレンダリングする。
  - `AgGridReactTable` — ag-Gridのデモコンポーネント。Recoilとは連携しておらず、ローカルの`useState`のみを使用。
  - `OTPForm.tsx` — 現状は空ファイル。
  - UIスタイルを持つ各コンポーネントには対応する`.css`ファイルが同階層にある（例: `InputTask.css`、`AddTask.css`）。

Todo機能の状態フロー: `InputTask`（`inputTitleState`の書き込み元、`addTitleState`の書き込み元） → `AddTask`（`addTitleState`/`addTitleStateLength`の読み取り元）。入力中の下書き状態と確定済みリスト状態を分離し、件数はセレクタで導出するというRecoilのパターンに従っている。

コードベース内のコメントは日本語で書かれていることが多い。
