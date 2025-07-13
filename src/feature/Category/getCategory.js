const CategoryDTO = require("../../models/Category");
module.exports = async ({ repository }) => {
  const docs = await repository.getAll();
  return docs.map((d) => new CategoryDTO(d));
};
