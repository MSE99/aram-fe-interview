import { describe, it, expect } from 'vitest'
import HelloWorld from './HelloWorld.vue'
import { render } from '@testing-library/vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const screen = render(HelloWorld, {props: {msg: 'Hello world'}})
    screen.getByText('Vite')
  })
})
