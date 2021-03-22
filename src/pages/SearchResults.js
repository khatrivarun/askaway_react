import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Radio,
  RadioGroup,
  Text,
  Wrap,
} from '@chakra-ui/react';
import NavBarComponent from '../components/NavBar';
import useSearch from '../hooks/useSearch';
import LoadingPage from './Loading';
import * as SearchFields from './../constants/searchFields';
import SearchQuestionListWrapperComponent from '../components/SearchQuestionListWrapper';
import UserListComponent from '../components/UserList';
import { IoArrowBack } from 'react-icons/io5';
import { useHistory } from 'react-router';
import FormfieldComponent from '../components/Formfield';
import { LoadingAnimation } from '../components/utility/LottieAnimations';
import categories from '../constants/categories';

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
        <FormfieldComponent
          label='Search Query'
          type='text'
          placeholder='Search Away!'
          value={searchQueryState}
          handleChange={(event) => setSearchQuerystate(event.target.value)}
        />
        <Text>What to search for?</Text>
        <RadioGroup onChange={setSearchFieldState} value={searchFieldState}>
          <Wrap>
            <Radio value={SearchFields.QUESTIONS}>Questions</Radio>
            <Radio value={SearchFields.USERS}>Users</Radio>
          </Wrap>
        </RadioGroup>
      </Box>
      {(searchFieldState === SearchFields.QUESTIONS ||
        searchFieldState === SearchFields.QUESTIONS_WITH_CATEGORIES) && (
        <>
          <Box m={5}>
            <FormControl>
              <FormLabel>Categories</FormLabel>
              <Wrap>
                {categories.map((category) => (
                  <Checkbox
                    m={3}
                    key={category.key}
                    value={category.key}
                    isChecked={categoriesState.indexOf(category.key) !== -1}
                    onChange={() => {
                      if (categoriesState.indexOf(category.key) === -1) {
                        setCategoryState([...categoriesState, category.key]);
                      } else {
                        const finalCategoryKeys = categoriesState.filter(
                          (key) => key !== category.key
                        );

                        setCategoryState(finalCategoryKeys);
                      }
                    }}
                  >
                    {category.title}
                  </Checkbox>
                ))}
              </Wrap>
            </FormControl>
            <Button
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
