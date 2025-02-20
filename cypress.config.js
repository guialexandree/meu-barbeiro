import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173',
    chromeWebSecurity: false,
    testIsolation: false,
    viewportWidth: 375,
    viewportHeight: 667,
    supportFile: 'src/main/test/cypress/support/e2e.ts',
    specPattern: 'src/**/*.test.ts'
  },
})
