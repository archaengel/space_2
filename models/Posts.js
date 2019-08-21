import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PostSchema = new Schema ({
  authorId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    maxlength: 5000,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Post = mongoose.model ('post', PostSchema)

export default Post
