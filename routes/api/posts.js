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
    authorId
  } = req.body

  const newPost = new Post({
    title,
    body,
    authorId
  })

  // Save new user
  newPost
    .save()
    .then( savedUser => {
      res.json(savedUser)
    })
    .catch( err => {
      res.status(400).json({ msg: 'Error saving post' })
    })
})

// @route   GET /api/posts/:user
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

module.exports = router
