import * as SearchFields from './../constants/searchFields';
import * as CategoryUtils from './../utils/categories';
import * as QuestionUtils from './../utils/questions';
import * as AuthUtils from './../utils/auth';
import { useState, useEffect } from 'react';
import { questionsIndex, usersIndex } from '../utils/Algolia';
import Bugsnag from '@bugsnag/js';

const useSearch = (
  searchField = SearchFields.QUESTIONS,
  searchQuery = '',
  categories = []
) => {
  const [loading, setLoading] = useState(true);
  const [questionResult, setQuestionResult] = useState([]);
  const [userResult, setUserResult] = useState([]);
  const [error, setError] = useState(null);

  const [searchFieldState, setSearchFieldState] = useState(searchField);
  const [searchQueryState, setSearchQuerystate] = useState(searchQuery);
  const [categoriesState, setCategoryState] = useState(categories);

  useEffect(() => {
    switch (searchFieldState) {
      case SearchFields.QUESTIONS: {
        questionsIndex
          .search(searchQueryState)
          .then((response) =>
            QuestionUtils.convertAlgoliaToQuestionObject(response.hits)
          )
          .then((data) => setQuestionResult(data))
          .catch((error) => {
            setError(error);
            Bugsnag.notify(error);
          })
          .finally(() => setLoading(false));
        break;
      }
      case SearchFields.USERS: {
        usersIndex
          .search(searchQueryState)
          .then((response) => AuthUtils.getUsersFromFirebase(response.hits))
          .then((data) => setUserResult(data))
          .catch((error) => {
            setError(error);
            Bugsnag.notify(error);
          })
          .finally(() => setLoading(false));
        break;
      }
      case SearchFields.QUESTIONS_WITH_CATEGORIES: {
        questionsIndex
          .search(searchQueryState, {
            filters: CategoryUtils.generateCategoryQuery(
              'categories',
              categoriesState
            ),
          })
          .then((response) =>
            QuestionUtils.convertAlgoliaToQuestionObject(response.hits)
          )
          .then((data) => setQuestionResult(data))
          .catch((error) => {
            setError(error);
            Bugsnag.notify(error);
          })
          .finally(() => setLoading(false));
        break;
      }
      default: {
      }
    }
  }, [searchFieldState, searchQueryState, categoriesState]);

  return {
    loading,
    questionResult,
    userResult,
    error,
    searchFieldState,
    searchQueryState,
    categoriesState,
    setSearchFieldState,
    setSearchQuerystate,
    setCategoryState,
  };
};

export default useSearch;
