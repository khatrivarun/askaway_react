export class Answer {
  id;
  byUser;
  answer;
  likes;

  constructor(id, byUser, answer, likes) {
    this.id = id;
    this.byUser = byUser;
    this.answer = answer;
    this.likes = likes;
  }

  fromJson(jsonData) {
    this.id = jsonData.id;
    this.byUser = jsonData.byUser;
    this.answer = jsonData.answer;
    this.likes = jsonData.likes;
  }

  toJson() {
    return {
      id: this.id,
      byUser: this.byUser,
      answer: this.answer,
      likes: this.likes,
    };
  }
}
