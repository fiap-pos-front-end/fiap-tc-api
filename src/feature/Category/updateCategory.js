const Category = require("../../models/Category");

const updateCategory = async ({ category, repository }) => {
  const resultado = await repository.update(category);
  return new Category(resultado.toJSON());
};

module.exports = updateCategory;
