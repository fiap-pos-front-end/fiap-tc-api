const Category = require("../../models/Category");

const getCategory = async ({ categoryFilter, repository }) => {
  const result = await repository.get(categoryFilter);
  return result?.map((category) => new Category(category));
};

module.exports = getCategory;
