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
  static className = "Tweet";
  static schema = {
    // all fields are encrypted by default
    author: {
      type: Person,
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

export { Person, Thought };
