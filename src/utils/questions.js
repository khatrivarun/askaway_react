import { firestoreDb } from './Firebase';
import { getCurrentUser } from './auth';
import { Question } from '../models/question';
import categories from '../constants/categories';
import * as AuthUtils from './auth';
import * as AnswerUtils from './answers';
import * as ContributorFields from './contributorsFields';

const questionDb = firestoreDb.collection('questions');

export const convertKeytoCategories = (keys) => {
  const categoryWithTitle = keys.map((key) => {
    const category = categories.find((c) => c.key === key);

    return category;
  });

  return categoryWithTitle;
};

export const questionStream = () => {
  return questionDb;
};

export const convertToQuestionObject = async (questions) => {
  const questionObjects = await Promise.all(
    questions.docs.map(async (question) => {
      const questionObject = new Question();
      questionObject.fromJson(question.data());
      questionObject.categories = convertKeytoCategories(
        questionObject.categories
      );

      questionObject.byUser = await AuthUtils.getUserFromFirebase(
        questionObject.byUser
      );

      return questionObject;
    })
  );

  return questionObjects;
};

export const fetchQuestion = async (questionId) => {
  const questionDoc = await questionDb.doc(questionId).get();
  const questionData = questionDoc.data();
  const question = new Question();

  question.fromJson(questionData);
  question.answers = await AnswerUtils.getAnswersForQuestion(question.answers);

  return question;
};

export const fetchQuestionInRealTime = (questionId) => {
  return questionDb.doc(questionId);
};

export const addQuestion = async (question, description, categories) => {
  const currentUser = getCurrentUser();
  const docId = questionDb.doc().id;

  const questionDoc = new Question(
    docId,
    currentUser.uid,
    question,
    description,
    categories,
    [],
    []
  );

  await questionDb.doc(docId).set(questionDoc.toJson());
  await AuthUtils.incrementCount(ContributorFields.QUESTIONS_ASKED);
};

export const updateQuestion = async (
  docId,
  question,
  description,
  categories
) => {
  await questionDb.doc(docId).update({
    question: question,
    description: description,
    categories: categories,
  });
};

export const deleteQuestion = async (id) => {
  await questionDb.doc(id).delete();
};

export const likeQuestion = async (likeList, questionId) => {
  const user = getCurrentUser();

  await questionDb.doc(questionId).update({
    likes: [...likeList, user.uid],
  });
};

export const unlikeQuestion = async (likeList, questionId) => {
  const user = getCurrentUser();
  const updatedLikeList = likeList.filter((like) => like !== user.uid);

  await questionDb.doc(questionId).update({
    likes: updatedLikeList,
  });
};
