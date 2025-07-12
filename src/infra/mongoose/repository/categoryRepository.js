const { Category } = require("../modelos");

const create = async (categoryData) => {
  const category = new Category(categoryData);
  return category.save();
};

const update = async (categoryData) => {
  const category = new Category(categoryData);
  return category.update();
};

const getById = async (id) => {
  return Category.findById(id);
};

const get = async (category = {}) => {
  return Category.find(category);
};

module.exports = {
  create,
  update,
  getById,
  get,
};
