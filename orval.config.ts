// orval.config.ts
import { defineConfig } from 'orval'
import { config } from 'dotenv'

config()

const output = (module: string) => ({
    mode: 'tags-split' as const,
    target: `./src/modules/${module}/infrastructure/generated/api`,
    schemas: `./src/modules/${module}/infrastructure/generated/models`,
    client: 'axios' as const,
    override: {
        mutator: {
            path: './src/api/httpClient.ts',
            name: 'customInstance',
        },
    },
})

export default defineConfig({
    auth: {
        input: {
            target: `${process.env.VITE_API_URL}/v3/api-docs`,
            filters: {
                tags: ['auth'],
            },
        },
        output: output('auth'),
    },

    dashboard: {
        input: {
            target: `${process.env.VITE_API_URL}/v3/api-docs`,
            filters: {
                tags: ['dashboard'],
            },
        },
        output: output('dashboard'),
    },
})