export const categoryQuery = (categories) => {
  const categoryKeys = categories.map((category) => category.key);

  return categoryKeys.join(';');
};
