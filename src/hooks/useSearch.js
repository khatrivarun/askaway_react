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

  const [searchFieldState] = useState(searchField);
  const [searchQueryState] = useState(searchQuery);
  const [categoriesState] = useState(categories);

  useEffect(() => {
    switch (searchFieldState) {
      case SearchFields.QUESTIONS: {
        axios
          .get(
            'https://us-central1-askaway-react-dev.cloudfunctions.net/searchForQuestions',
            { params: { searchQuery: searchQueryState } }
          )
          .then((response) =>
            QuestionUtils.convertToQuestionObject(response.data)
          )
          .then((questions) => {
            setResult(questions);
          })
          .catch((error) => setError(error))
          .then(() => setLoading(false));
        break;
      }
      case SearchFields.USERS: {
        axios
          .get(
            'https://us-central1-askaway-react-dev.cloudfunctions.net/searchForUsers',
            { params: { searchQuery: searchQueryState } }
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
                searchQuery: searchQueryState,
                categories: CategoryUtils.categoryQuery(categoriesState),
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
  }, [searchFieldState, searchQueryState, categoriesState]);

  return { loading, result, error };
};

export default useSearch;
