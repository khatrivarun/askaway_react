import { Checkbox, FormControl, FormLabel, Wrap } from '@chakra-ui/react';
import categories from '../constants/categories';

const CategoriesCheckboxComponent = ({ categoriesState, setCategoryState }) => {
  return (
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
  );
};

export default CategoriesCheckboxComponent;
