/* eslint-env node, jest */
import {
  compare,
  validateUser,
} from './auth'

const unhashedPW = '123456'
const hashedPW = '$2a$13$j5sRrJ7B3ATIF6kdZS7z.ehPiDXrZsatu/hzB3H92oMpBK34bAv6e'
const user = {
  name: 'test',
  email: 'edboedbo@gmail.com',
  password: hashedPW,
}

describe ('Auth api', () => {
  it ('compares passwords', done => {
    const eventualTest = compare (unhashedPW) (hashedPW)
      .map (x => expect (x).toEqual (true))

    eventualTest
      .fork (
        e => {
          console.error (e)
          done ()
        },
        _ => {
          console.log ('Tests passed')
          done ()
        }
      )
  })

  it ('validate user returns user', done => {
    const eventualTest = validateUser (unhashedPW) (user)
      .map (x => expect (x).toMatchObject (user))

    eventualTest
      .fork (
        e => {
          console.error (e)
          done ()
        },
        _ => {
          console.log ('Tests passed')
          done ()
        }
      )
  })
})
