const { Category } = require("../modelos");

module.exports = {
  create: async (data) => Category.create(data),
  update: async (id, data) =>
    Category.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
  remove: async (id) => Category.findByIdAndDelete(id),
  getById: async (id) => Category.findById(id),
  getAll: async (filter = {}) => Category.find(filter),
};
