import { User } from './user';

export class Answer {
  byUser;
  answer;
  likes;

  constructor(byUser, answer, likes) {
    this.byUser = byUser;
    this.answer = answer;
    this.likes = likes;
  }

  fromJson(jsonData) {
    const user = new User();
    user.fromJSON(jsonData['byUser']);

    this.byUser = user;
    this.answer = jsonData['answer'];
    this.likes = jsonData['likes'];
  }

  toJson() {}
}
