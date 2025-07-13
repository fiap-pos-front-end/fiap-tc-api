module.exports = async ({ category, repository }) => {
  if (!category.isValid() || !category.id)
    throw new Error("ID ou dados da categoria faltando");
  return repository.update(category.id, { name: category.name });
};
