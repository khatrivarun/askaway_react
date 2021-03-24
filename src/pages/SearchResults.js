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
import * as SearchFields from './../constants/searchFields';
import SearchQuestionListWrapperComponent from '../components/SearchQuestionListWrapper';
import UserListComponent from '../components/UserList';
import { IoArrowBack } from 'react-icons/io5';
import { Redirect, useHistory } from 'react-router';
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

  return !error ? (
    <Flex direction='column' m={10} align='flex-start'>
      <Button
        leftIcon={<IoArrowBack />}
        colorScheme='white'
        color='teal'
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
        <Box w='100%'>
          {loading ? (
            <Center w='100%' h='100%'>
              <LoadingAnimation />
            </Center>
          ) : (
            <UserListComponent users={userResult} />
          )}
        </Box>
      )}
    </Flex>
  ) : (
    <Redirect to='/500' />
  );
};

export default SearchResultsPage;
