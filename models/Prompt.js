import mongoose from 'mongoose'

const promptSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
      minlength: 5,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  }
)

promptSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id
    delete ret._id
  },
})

promptSchema.index({ tags: 1 })
promptSchema.index({ status: 1 })
promptSchema.index({ created_at: -1 })

export default mongoose.model('Prompt', promptSchema)
