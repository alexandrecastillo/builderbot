import type { ProviderClass } from '@alexandrecastillo/builderbot-bot'

export type BotCtxMiddleware = Partial<ProviderClass & { provider: any }>
