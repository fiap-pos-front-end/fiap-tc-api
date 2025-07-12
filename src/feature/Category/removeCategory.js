const Category = require("../../models/Category");

const removeCategory = async ({ category, repository }) => {
  const resultado = await repository.remove(category);
  return new Category(resultado.toJSON());
};

module.exports = removeCategory;
