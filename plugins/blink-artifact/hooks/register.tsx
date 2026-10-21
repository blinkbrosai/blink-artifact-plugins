import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Current } from '../types'

// Watches blink-artifact MCP calls and shows the last artifact as a clickable "⧉ <title>" next to the mode labels under the prompt.
// A manually added server (mcp__blink-artifact__) or this plugin's server (mcp__plugin_blink-artifact_blink-artifact__)
const TOOL = /^mcp__(plugin_blink-artifact_)?blink-artifact__/
const ID = /^[a-z2-7]{26}$/
const MAX = 40
const current = atom({ plugin: 'blink-artifact', key: 'current' } as const, null as Current)

// Titles and URLs seen this session (id → value); reset on reload, the shown value stays in $.state.
const titles = new Map<string, string>()
const urls = new Map<string, string>()

// Tool result: a JSON string for MCP tools; for an object, structuredContent or the first text block.
function payload(result: unknown): Record<string, unknown> {
  const r = result as { structuredContent?: unknown; content?: Array<{ type?: string; text?: string }> } | string | undefined
  if (r && typeof r === 'object' && typeof r.structuredContent === 'object' && r.structuredContent !== null) return r.structuredContent as Record<string, unknown>
  const text = typeof r === 'string' ? r : r?.content?.find(b => b.type === 'text')?.text
  if (typeof text === 'string') {
    try {
      const v = JSON.parse(text)
      if (v && typeof v === 'object') return v as Record<string, unknown>
    } catch {
      // not JSON
    }
  }
  return {}
}

const short = (s: string) => (s.length > MAX ? s.slice(0, MAX - 1) + '…' : s)

export const register: Register = on => {
  on('tool.call', { tool: TOOL }, async ($, e, next) => {
    const ran = await next(e)
    if (ran.deny !== undefined || ran.isError === true) return ran
    const out = payload(ran.result)
    const args = e as Record<string, unknown>
    const id = typeof out.id === 'string' ? out.id : typeof args.id === 'string' ? args.id : undefined
    if (!id || !ID.test(id)) return ran
    for (const t of [args.title, out.title]) if (typeof t === 'string' && t.trim()) titles.set(id, t.trim())
    if (typeof out.url === 'string' && out.url.startsWith('https://')) urls.set(id, out.url)
    const prev = await read($, current)
    const url = urls.get(id) ?? (prev?.id === id ? prev.url : undefined)
    const title = titles.get(id) ?? (prev?.id === id ? prev.title : id.slice(0, 8))
    await update($, current, () => ({ id, title, url }))
    return ran
  }).catch(($, e, next) => next(e)) // an indicator error must not break the tool call

  // Bottom-right under the prompt (mode labels): keep the engine's labels and append the link.
  on('ui.render', { component: 'SessionMode' }, async ($, e, next) => {
    const c = await read($, current)
    if (!c) return next(e)
    const { Box, Text, Link } = $.ui.resolve(e)
    const label = `⧉ ${short(c.title)}`
    const modes = e.props.modes.join(' & ')
    return (
      <Box>
        {modes ? <Text dimColor>{`${modes} · `}</Text> : null}
        {c.url ? <Link href={c.url}>{label}</Link> : <Text dimColor>{label}</Text>}
      </Box>
    )
  })
}
