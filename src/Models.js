import { Model, User } from "radiks";

class Tweet extends Model {
  static className = "Tweet";
  static schema = {
    // all fields are encrypted by default
    user: {
      type: User,
      decrypted: true,
    },
    tweet: {
      type: String,
      decrypted: true,
    },
    date: {
      type: String,
      decrypted: true,
    },
  };
}

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
    // tweets: {
    //   type: Array
    // }
  };
}
export { Person, Tweet };
