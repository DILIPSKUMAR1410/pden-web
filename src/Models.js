import { Model, User } from "radiks";

class Person extends Model {
  static className = "Person";
  static schema = {
    username: {
      type: String,
      decrypted: true,
    },
    followers: {
      type: Array,
    },
    following: {
      type: Array,
    },
  };
}

class Thought extends Model {
  static className = "Thought";
  static schema = {
    // all fields are encrypted by default
    author: {
      type: String,
      decrypted: true,
    },
    text: {
      type: String,
      decrypted: true,
    },
    date: {
      type: Date,
      decrypted: true,
    },

  };
}

class Message extends Model {
  static className = "Message";
  static schema = {
    postid: {
      type: String,
      decrypted: true,
    },
    author: {
      type: String,
      decrypted: true,
    },
    text: {
      type: String,
      decrypted: true,
    },
    date: {
      type: Date,
      decrypted: true,
    },
  }
}

export { Person, Thought, Message };
