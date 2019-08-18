import {
  compare
} from './auth'

const unhashedPW = '123456'
const hashedPW = '$2a$13$j5sRrJ7B3ATIF6kdZS7z.ehPiDXrZsatu/hzB3H92oMpBK34bAv6e'

describe('Auth api', () => {
  it('compares passwords', done => {
    const eventualTest = compare (unhashedPW) (hashedPW)
      .map (x => expect (x) .toEqual (true))

    eventualTest
      .fork(
        e => {
          console.error (e)
          done()
        },
        _ => {
          console.log ('Tests passed')
          done()
        }
      )
  })
})
