/* eslint-env ndoe, es6, jest */
import {saveOr} from '../../utils/helpers'
import mongoose from 'mongoose'

import {uri, dbOptions} from '../../server'
import Post from '../../models/Posts'

describe ('posts', () => {
  beforeAll (() => {
    mongoose.connect (uri, dbOptions)
  })

  afterAll (() => {
    mongoose.disconnect ()
  })

  const testPost = new Post ({
    title: 'test',
    body: 'test body',
    authorId: '1234',
  })

  const logErr = cb => e => {
    console.error (e)
    cb ()
  }

  const saveError = {status: 400, message: 'Error saving post'}

  const logPass = cb => _ => {
    console.log ('Tests Passed')
    cb ()
  }

  it ('saves', done => {
    const futTest = saveOr (saveError) (testPost)
    .map (x => expect (x).toHaveProperty ('_id'))

    futTest
    .fork (logErr (done), logPass (done))
  })
})
