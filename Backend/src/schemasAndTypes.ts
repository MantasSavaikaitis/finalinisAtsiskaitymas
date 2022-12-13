import mongoose from "mongoose";

//Schemas and models====================================
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  imageUrl: {
    type: Array,
    items: String,
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },


});

const UserModel = mongoose.model('User', userSchema);

export { UserModel };

//Types========================================

export interface User {
  username: string,
  password: string,
  imageUrl: string[],
  bio: string,
}

export type userLogin = {
  username: string,
  password: string,
}

export type Task = {
  data: Object | String,
  action: String,
}

export type NewUser = {
  username: string,
  email: string,
  password: string,
  gender: string,
  age: number,
  city: string,
}
