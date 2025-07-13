module.exports = async ({ category, repository }) => {
  if (!category.isValid()) throw new Error("Categoria inválida");
  return repository.create({ name: category.name });
};
