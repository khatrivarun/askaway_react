import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Text,
  Wrap,
} from '@chakra-ui/react';
import useSearch from '../hooks/useSearch';
import LoadingPage from './Loading';
import * as SearchFields from './../constants/searchFields';
import SearchQuestionListWrapperComponent from '../components/SearchQuestionListWrapper';
import UserListComponent from '../components/UserList';
import { IoArrowBack } from 'react-icons/io5';
import { useHistory } from 'react-router';
import FormfieldComponent from '../components/Formfield';
import { LoadingAnimation } from '../components/utility/LottieAnimations';
import CategoriesCheckboxComponent from '../components/CategoriesCheckbox';

const SearchResultsPage = ({ searchQuery, searchMode }) => {
  const {
    error,
    loading,
    questionResult,
    userResult,
    searchFieldState,
    searchQueryState,
    categoriesState,
    setSearchFieldState,
    setSearchQuerystate,
    setCategoryState,
  } = useSearch(searchMode, searchQuery);

  const history = useHistory();

  return (
    <Flex direction='column' m={10} align='flex-start'>
      <Button
        leftIcon={<IoArrowBack />}
        colorScheme='white'
        color='teal'
        my={5}
        onClick={() => history.goBack()}
      >
        Go back
      </Button>
      <Box>
        <Box mx={5}>
          <Heading>Search Results</Heading>
        </Box>
        <FormfieldComponent
          label='Search Query'
          type='text'
          placeholder='Search Away!'
          value={searchQueryState}
          handleChange={(event) => setSearchQuerystate(event.target.value)}
        />
        <Box mx={5}>
          <Text>What to search for?</Text>
          <RadioGroup onChange={setSearchFieldState} value={searchFieldState}>
            <Wrap>
              {searchFieldState === SearchFields.QUESTIONS ? (
                <Radio m={5} value={SearchFields.QUESTIONS}>
                  Questions
                </Radio>
              ) : searchFieldState ===
                SearchFields.QUESTIONS_WITH_CATEGORIES ? (
                <Radio m={5} value={SearchFields.QUESTIONS_WITH_CATEGORIES}>
                  Questions
                </Radio>
              ) : (
                <Radio m={5} value={SearchFields.QUESTIONS}>
                  Questions
                </Radio>
              )}
              <Radio value={SearchFields.USERS}>Users</Radio>
            </Wrap>
          </RadioGroup>
        </Box>
      </Box>
      {(searchFieldState === SearchFields.QUESTIONS ||
        searchFieldState === SearchFields.QUESTIONS_WITH_CATEGORIES) && (
        <>
          <Box m={5}>
            <CategoriesCheckboxComponent
              categoriesState={categoriesState}
              setCategoryState={setCategoryState}
            />
            <Button
              colorScheme='teal'
              onClick={() =>
                setSearchFieldState(SearchFields.QUESTIONS_WITH_CATEGORIES)
              }
            >
              Apply Filter
            </Button>
          </Box>
          {loading ? (
            <Center w='100%' h='100%'>
              <LoadingAnimation />
            </Center>
          ) : (
            <SearchQuestionListWrapperComponent questions={questionResult} />
          )}
        </>
      )}
      {searchFieldState === SearchFields.USERS && (
        <Box>
          {loading ? (
            <LoadingPage>
              <Text>Getting Search Results</Text>
            </LoadingPage>
          ) : (
            <UserListComponent users={userResult} />
          )}
        </Box>
      )}
    </Flex>
  );
};

export default SearchResultsPage;
