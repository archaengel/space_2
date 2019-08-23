/* eslint-env ndoe, es6, jest */
export const logErr = cb => e => {
  console.error (e)
  cb ()
}

export const logPass = cb => _ => {
  console.log ('Tests Passed')
  cb ()
}
