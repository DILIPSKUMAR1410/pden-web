import { Model, User } from 'radiks';
class Tweet extends Model {
  static className = 'Tweet';
  static schema = { // all fields are encrypted by default
    user: String,
    tweet: String,
    date: String,

  }
};
export default Tweet;

