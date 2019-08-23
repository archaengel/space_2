import express from 'express'
const router = express.Router ()

import {saveOr} from '../../utils/helpers'

import Post from '../../models/Posts'

// Import middlware
import auth from '../../middleware/auth'

// @route POST /api/posts
// @desc  Create new post
// @access Private
router.post ('/', auth, (req, res) => {
  const {title, body} = req.body
  const saveError = {status: 400, message: 'Error saving post'}
  const authorId = req.user.id
  const newPost = new Post ({title, body, authorId})

  // Save new post
  const futSave = saveOr (saveError) (newPost)

  futSave
  .fork (
    e => res.status (e.status).json ({msg: e.message}),
    res.json
  )
})

// @route   GET /api/posts/user
// @desc    Get array of posts by user
// @access  Private
router.get ('/user', auth, (req, res) => {
  Post.find ({authorId: req.user.id})
    .exec ((err, returnedPosts) => {
      if (err) {
        res.end (err)
      }
      res.json (returnedPosts)
    })
})

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Private
router.delete ('/:id', auth, (req, res) => {
  Post
    .deleteOne ({_id: req.params.id})
    .then (res => res.json ({success: true}))
    .catch (err => res.json ({success: false}))
})

// @route   PATCH /api/posts/edit
// @desc    Edit post
// @access  Public
router.patch ('/edit', auth, (req, res) => {
  Post
    .findByIdAndUpdate (
      req.body._id,
      {title: req.body.title, body: req.body.body},
      {new: true}
    )
    .then (updatedPost => {
      res.json (updatedPost)
    })
    .catch (err => res.status (400).json ({msg: 'Error updating post'}))
})

export default router
