import { useEffect, useState } from 'react';
import * as QuestionUtils from './../utils/questions';

const useQuestion = (id) => {
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    QuestionUtils.fetchQuestion(id)
      .then((question) => {
        setQuestion(question);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  return { loading, question, error };
};

export default useQuestion;
