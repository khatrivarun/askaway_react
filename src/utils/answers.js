import { firestoreDb } from './Firebase';
import { getCurrentUser } from './auth';
import { Answer } from '../models/answer';
import * as AuthUtils from './auth';
import * as ContributorFields from './contributorsFields';
import uuid from 'react-uuid';

const questionDb = firestoreDb.collection('questions');

export const getAnswersForQuestion = async (answers) => {
  const answersWithUsers = await Promise.all(
    answers.map(async (answer) => {
      answer.byUser = await AuthUtils.getUserFromFirebase(answer.byUser);
      return answer;
    })
  );

  return answersWithUsers;
};

export const addAnswer = async (questionId, answer, answersList) => {
  const answerId = uuid();
  const user = getCurrentUser();

  const answerObject = new Answer(answerId, user.uid, answer, []);
  const questionRef = questionDb.doc(questionId);

  await questionRef.update({
    answers: [...answersList, answerObject.toJson()],
  });
  await AuthUtils.incrementCount(ContributorFields.QUESTIONS_ANSWERED);
};

export const updateAnswer = async (
  questionId,
  answerId,
  newAnswer,
  answersList
) => {
  const questionRef = questionDb.doc(questionId);
  const updatedAnswers = answersList.map((answer) => {
    if (answer.id === answerId) {
      answer.answer = newAnswer;
    }
    return answer;
  });

  await questionRef.update({
    answers: updatedAnswers,
  });
};

export const deleteAnswer = async (answerId, questionId, answersList) => {
  const questionRef = questionDb.doc(questionId);
  const updatedAnswers = answersList.filter((answer) => answer.id !== answerId);

  await questionRef.update({
    answers: updatedAnswers,
  });
};

export const likeAnswer = async (answerId, questionId, answersList) => {
  const questionRef = questionDb.doc(questionId);
  const user = getCurrentUser();
  const updatedAnswers = answersList.map((answer) => {
    if (answer.id === answerId) {
      answer.likes.push(user.uid);
    }

    return answer;
  });

  await questionRef.update({
    answers: updatedAnswers,
  });
};

export const unlikeAnswer = async (answerId, questionId, answersList) => {
  const questionRef = questionDb.doc(questionId);
  const user = getCurrentUser();

  const updatedAnswers = answersList.map((answer) => {
    if (answer.id === answerId) {
      answer.likes = answer.likes.filter((like) => like !== user.uid);
    }

    return answer;
  });

  await questionRef.update({
    answers: updatedAnswers,
  });
};
