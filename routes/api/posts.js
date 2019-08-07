const express = require('express')
const router = express.Router()

const Post = require('../../models/Posts')

// Import middlware
const auth = require('../../middleware/auth')

// @route POST /api/posts
// @desc  Create new post
// @access Private
router.post('/', auth, (req, res) => {
  const {
    title,
    body,
  } = req.body

  const authorId = req.user.id

  const newPost = new Post({
    title,
    body,
    authorId
  })

  // Save new post
  newPost
    .save()
    .then( savePost => {
      res.json(savePost)
    })
    .catch( err => {
      res.status(400).json({ msg: 'Error saving post' })
    })
})

// @route   GET /api/posts/user
// @desc    Get array of posts by user
// @access  Private
router.get('/user', auth, (req, res) => {
  Post.find({ authorId: req.user.id })
    .exec((err, returnedPosts) => {
      if (err) {
        res.end(err)
      }
      res.json(returnedPosts)
    })
})

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Post
    .deleteOne({ _id: req.params.id })
    .then(res => res.json({ success: true }))
    .catch(err => res.json({ success: false }))
})

module.exports = router
