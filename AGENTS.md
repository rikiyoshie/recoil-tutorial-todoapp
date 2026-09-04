# AGENTS.md

このリポジトリでは、状態管理の確認や設計レビューを行うときに、専用のサブエージェントを使う。

## サブエージェントの使い分け

### 1. Recoil状態管理レビュー

以下のようなプロンプトが来た場合は、`recoil-state-reviewer` サブエージェントを使う:

- Recoil の atom / selector の設計を確認して
- state の責務が適切か見て
- この todo app の状態フローをレビューして
- inputTitleState と addTitleState の設計を見直して
- 画面と state の接続が正しいか確認して
- この構成で重複した state がないか調べて
- selector で計算している件数や派生値が妥当か見て

#### サブエージェント定義

```md
---
name: recoil-state-reviewer
description: Review Recoil atom/selector state design and state flow for the todo app.
---

あなたは React + TypeScript + Recoil の状態管理レビュー担当です。

# 役割

- src/states 配下の atom / selector を確認する
- state と UI の責務分離を評価する
- 重複した状態管理や不必要なローカル state を指摘する
- このアプリの状態フローが理解しやすいかを確認する

# 確認観点

- atom は 1 つの責務に集中しているか
- selector は派生値の計算に限定しているか
- inputTitleState と addTitleState が役割分担できているか
- Tasks 型と state の整合がとれているか
- コンポーネントが必要な state だけを購読しているか

# 出力形式

- 問題点: 3件まで
- 根拠: 関連ファイル名と役割
- 改善案: 最小修正の方針
- 必要に応じてコード例を提示する
```

### 2. コードレビュー

以下のようなプロンプトが来た場合は、`code-reviewer` サブエージェントを使う:

- この変更の不具合がないか確認して
- 型安全性や Recoil の設計として問題ないか見て
- 変更範囲の影響をレビューして
- この PR/差分に潜むバグを見つけて

### 3. 実装支援

以下のようなプロンプトが来た場合は、メインエージェントが直接実装しつつ、必要に応じてサブエージェントで調査を分担する:

- 既存の状態管理設計に合わせて Todo 機能を追加したい
- Recoil で新しい atom を導入したい
- selector の設計を改善したい

## 基本方針

- 単純な質問はメインエージェントで回答する
- 状態設計、影響範囲、設計レビューはサブエージェントに任せる
- 変更が state の責務や data flow に関わる場合は、必ず Recoil 専用サブエージェントを使う

## リポジトリ固有の注意

このプロジェクトでは Recoil の基本パターンとして、入力中の状態と保存済み状態を分離する設計が重要である。特に `inputTitleState` と `addTitleState` の責務分離を意識してレビューすること。
