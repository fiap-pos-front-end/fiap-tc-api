class Category {
  constructor({ _id, name }) {
    this.id = _id;
    this.name = name;
  }
  isValid() {
    return this.name;
  }
}

module.exports = Category;
