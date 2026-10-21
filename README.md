# blink artifact plugins for Claude Code

[blink artifact](https://artifact.blinkbrosai.com) lets your AI agent publish and live-edit HTML pages, docs, slides, dashboards and designs at a permanent address, together with your team.

## blink-artifact

- Connects Claude Code to the blink artifact MCP server — no `claude mcp add` needed.
- Shows the artifact you are working on under the prompt as a clickable `⧉ <title>` link.

### Install

1. Create an API token at https://artifact.blinkbrosai.com/app#agent
2. In Claude Code, run:

```
/plugin install blink-artifact --marketplace blinkbrosai/blink-artifact-plugins
```

Answer `y` to add the marketplace, choose a scope, then paste your token when asked. The token is stored in your system's secure credential storage.

From a shell:

```
claude plugin marketplace add blinkbrosai/blink-artifact-plugins
claude plugin install blink-artifact@blinkbrosai
claude plugin configure blink-artifact@blinkbrosai
```

To change the token later: `/plugin configure blink-artifact@blinkbrosai`.

If you already added the server with `claude mcp add`, that entry takes precedence; you can remove it with `claude mcp remove blink-artifact`.

## License

MIT
