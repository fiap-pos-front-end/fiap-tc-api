module.exports = async ({ category, repository }) => {
  if (!category._id) throw new Error("ID da categoria faltando");
  return repository.remove(category.id);
};
