import * as SearchFields from './../constants/searchFields';
import * as CategoryUtils from './../utils/categories';
import * as QuestionUtils from './../utils/questions';
import * as AuthUtils from './../utils/auth';
import axios from 'axios';
import { useState, useEffect } from 'react';

const useSearch = (
  searchField = SearchFields.QUESTIONS,
  searchQuery = '',
  categories = []
) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    switch (searchField) {
      case SearchFields.QUESTIONS: {
        axios
          .get(
            'https://us-central1-askaway-react-dev.cloudfunctions.net/searchForQuestions',
            { params: { searchQuery: searchQuery } }
          )
          .then((response) =>
            QuestionUtils.convertToQuestionObject(response.data)
          )
          .then((questions) => setResult(questions))
          .catch((error) => setError(error))
          .then(() => setLoading(false));
        break;
      }
      case SearchFields.USERS: {
        axios
          .get(
            'https://us-central1-askaway-react-dev.cloudfunctions.net/searchForUsers',
            { params: { searchQuery: searchQuery } }
          )
          .then((response) => AuthUtils.getUsersFromFirebase(response.data))
          .then((users) => setResult(users))
          .catch((error) => setError(error))
          .then(() => setLoading(false));
        break;
      }
      case SearchFields.QUESTIONS_WITH_CATEGORIES: {
        axios
          .get(
            'https://us-central1-askaway-react-dev.cloudfunctions.net/searchForQuestionsByCategories',
            {
              params: {
                searchQuery: searchQuery,
                categories: CategoryUtils.categoryQuery(categories),
              },
            }
          )
          .then((response) =>
            QuestionUtils.convertToQuestionObject(response.data)
          )
          .then((questions) => setResult(questions))
          .catch((error) => setError(error))
          .then(() => setLoading(false));
        break;
      }
      default: {
      }
    }
  }, [searchField, searchQuery, categories]);

  return { loading, result, error };
};

export default useSearch;
