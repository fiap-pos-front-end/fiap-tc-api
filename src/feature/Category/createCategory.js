const Category = require("../../models/Category");

const createCategory = async ({ category, repository }) => {
  const resultado = await repository.create(category);
  return new Category(resultado.toJSON());
};

module.exports = createCategory;
