export const generateCategoryQuery = (categoryName, categories) => {
  const categoryQueryArray = categories.map(
    (category) => `${categoryName}:${category}`
  );

  return categoryQueryArray.join(' AND ');
};
