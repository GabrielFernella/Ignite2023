import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
})

// plugin para entender o esquema dos paths com o @
