import { Flex } from '@chakra-ui/react';
import NavBarComponent from '../components/NavBar';
import useSearch from '../hooks/useSearch';
import LoadingPage from './Loading';
import * as SearchFields from './../constants/searchFields';
import SearchQuestionListWrapperComponent from '../components/SearchQuestionListWrapper';

const SearchResultsPage = ({ searchQuery, searchMode }) => {
  const { error, loading, result } = useSearch(searchMode, searchQuery);

  console.log(error);

  return !loading ? (
    <Flex direction='column' m={5}>
      <NavBarComponent />
      {searchMode === SearchFields.QUESTIONS && (
        <SearchQuestionListWrapperComponent questions={result} />
      )}
    </Flex>
  ) : (
    <LoadingPage>Fetching search results</LoadingPage>
  );
};

export default SearchResultsPage;
