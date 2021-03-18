import { firestoreDb } from './Firebase';
import { getCurrentUser } from './auth';
import { Answer } from '../models/answer';
import * as AuthUtils from './auth';
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
};

export const updateAnswer = async (
  questionId,
  answerId,
  newAnswer,
  answersList
) => {
  const questionRef = questionDb.doc(questionId);
  const oldAnswer = answersList.find((answer) => answer.id === answerId);
  const updatedAnswers = answersList.filter((answer) => answer.id !== answerId);
  const user = getCurrentUser();

  const answer = new Answer(answerId, user.uid, newAnswer, oldAnswer.likes);

  await questionRef.update({
    answers: [...updatedAnswers, answer.toJson()],
  });
};

export const deleteAnswer = async (answerId, questionId, answersList) => {
  const questionRef = questionDb.doc(questionId);
  const updatedAnswers = answersList.filter((answer) => answer.id !== answerId);

  await questionRef.update({
    answers: updatedAnswers,
  });
};
