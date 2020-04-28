import { Model, User } from 'radiks';
class Tweet extends Model {
  static className = 'Tweet';
  static schema = { // all fields are encrypted by default
    user: {
      type: String,
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
  }
};
export default Tweet;

