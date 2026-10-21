export type Current = { id: string; title: string; url?: string } | null

declare module 'claude-code' {
  interface PluginState {
    'blink-artifact': { current: Current }
  }
}
