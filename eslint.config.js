// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    '@stylistic/comma-dangle': ['error', 'never'],
    '@typescript-eslint/no-explicit-any': 'off'
  }
})
