#!/usr/bin/env bash
# PostToolUse (Write|Edit) hook: コード編集後に lint / format / typecheck を実行する。
# いずれか失敗したら exit 2 で Claude に差し戻す（失敗内容は stderr へ）。
# stdin には Claude Code のフック入力 JSON が渡される。

# 編集対象ファイルのパスを取り出す（jq は Windows に無いので node で parse）。
file_path=$(node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);process.stdout.write((j.tool_input&&j.tool_input.file_path)||(j.tool_response&&j.tool_response.filePath)||"")}catch(e){}})')

# コード系ファイル以外（.md など）の編集ではチェックしない。
case "$file_path" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs|*.css) ;;
  *) exit 0 ;;
esac

cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0

fail=""

if ! out=$(npm run -s lint 2>&1); then
  fail="${fail}=== lint 失敗 ===
${out}

"
fi

if ! out=$(npx --no-install prettier --check . 2>&1); then
  fail="${fail}=== format 失敗 (prettier --check .) ===
${out}

"
fi

if ! out=$(npm run -s typecheck 2>&1); then
  fail="${fail}=== typecheck 失敗 ===
${out}

"
fi

if [ -n "$fail" ]; then
  printf '編集後チェックに失敗しました。続行前に修正してください:\n\n%s' "$fail" >&2
  exit 2
fi

exit 0
