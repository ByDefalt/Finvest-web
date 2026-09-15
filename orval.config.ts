// orval.config.ts
import { defineConfig } from 'orval'
import { config } from 'dotenv'

config() // charge le .env dans process.env

export default defineConfig({
    api: {
        input: {
            target: `${process.env.VITE_API_URL}/v3/api-docs`,
        },
        output: {
            mode: 'tags-split',
            target: './src/generated/api',
            schemas: './src/generated/models',
            client: 'axios',
            override: {
                mutator: {
                    path: './src/api/httpClient.ts',
                    name: 'customInstance',
                },
            },
        },
    },
})