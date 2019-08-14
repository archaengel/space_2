import { email } from './email'

describe('email router', () => {
  it('output email', () => {
    expect(email()).toEqual('email')
  })
})
