# blink artifact plugins for Claude Code

[blink artifact](https://artifact.blinkbrosai.com) lets your AI agent publish and live-edit HTML pages, docs, slides, dashboards and designs at a permanent address, together with your team.

## blink-artifact

- Connects Claude Code to the blink artifact MCP server — no `claude mcp add` needed.
- Shows the artifact you are working on under the prompt as a clickable `⧉ <title>` link.

### Install

In Claude Code, run:

```
/plugin install blink-artifact --marketplace blinkbrosai/blink-artifact-plugins
```

Answer `y` to add the marketplace and choose a scope. Then run `/mcp`, pick `blink-artifact` and choose **Authenticate**: the browser opens, you sign in, and the tools load. No token is needed.

From a shell:

```
claude plugin marketplace add blinkbrosai/blink-artifact-plugins
claude plugin install blink-artifact@blinkbrosai
```

If you already added the server with `claude mcp add`, that entry takes precedence; you can remove it with `claude mcp remove blink-artifact`.

## blink-connectors

[Blink Connectors](https://connectors.blinkbrosai.com) puts every app you connect (Gmail, GitHub, Notion, Slack and more) behind one MCP server. Claude Code sees their actions as tools.

### Install

1. Open a project at https://connectors.blinkbrosai.com/app and copy its key (starts with `sk_`). The key is shown once.
2. In Claude Code, run:

```
/plugin install blink-connectors --marketplace blinkbrosai/blink-artifact-plugins
```

3. Paste the key. Accounts you connect are saved under this key, so use the same key on every machine. Each person needs their own project.

To connect an app, ask Claude, for example "connect my Gmail". It returns a link; open it in your browser and sign in. Then run `/mcp`, reconnect `blink-connectors`, and the app's tools appear.

To change the key later: `/plugin configure blink-connectors@blinkbrosai`.

If you already added the server with `claude mcp add`, that entry takes precedence; you can remove it with `claude mcp remove blink-connectors`.

## License

MIT
