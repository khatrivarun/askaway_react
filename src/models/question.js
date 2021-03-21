export class Question {
  id;
  byUser;
  question;
  description;
  categories;
  likes;
  answers;
  selectedAnswerId;

  constructor(
    id,
    byUser,
    question,
    description,
    categories,
    likes,
    answers,
    selectedAnswerId
  ) {
    this.id = id;
    this.byUser = byUser;
    this.question = question;
    this.description = description;
    this.categories = categories;
    this.likes = likes;
    this.answers = answers;
    this.selectedAnswerId = selectedAnswerId;
  }

  fromJson(jsonData) {
    this.id = jsonData.id;
    this.byUser = jsonData.byUser;
    this.question = jsonData.question;
    this.description = jsonData.description;
    this.categories = jsonData.categories;
    this.likes = jsonData.likes;
    this.answers = jsonData.answers;
    this.selectedAnswerId = jsonData.selectedAnswerId;
  }

  toJson() {
    return {
      id: this.id,
      byUser: this.byUser,
      question: this.question,
      description: this.description,
      categories: this.categories,
      likes: this.likes,
      answers: this.answers,
      selectedAnswerId: this.selectedAnswerId,
    };
  }
}
