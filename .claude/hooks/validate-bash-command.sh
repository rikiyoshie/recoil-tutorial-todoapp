#!/bin/bash

COMMAND=$(jq -r '.tool_input.command')

if echo "$COMMAND" | grep -Eq 'git[[:space:]]+push.*[[:space:]]main([[:space:]]|$)'; then
  jq -n '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: "mainブランチへの直接pushは禁止されています。featureブランチからPRを作成してください。"
    }
  }'
else
  exit 0
fi