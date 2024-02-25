const { model, Schema } = require("mongoose");

const authSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      unique: true,
      required: true,
    },
  }, 
  {
    timestamps: true
  }
);

authSchema.set('toObject', {
  transform: (_doc, ret) => {
    return {
      ...ret,
      id: ret._id.toString()
    }
  }
})


module.exports = model("authenticatedUser", authSchema);