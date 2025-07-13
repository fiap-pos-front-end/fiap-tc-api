const categoryDTO = require("../models/Category");

class CategoryController {
  constructor(di = {}) {
    this.di = Object.assign(
      {
        categoryRepository: require("../infra/mongoose/repository/categoryRepository"),

        createCategory: require("../feature/Category/createCategory"),
        updateCategory: require("../feature/Category/updateCategory"),
        removeCategory: require("../feature/Category/removeCategory"),
        getCategory: require("../feature/Category/getCategory"),
      },
      di
    );
  }

  async create(req, res) {
    const category = new categoryDTO(req.body);
    const { categoryRepository, createCategory } = this.di;

    if (!category.isValid())
      return res
        .status(400)
        .json({ message: "não houve informações enviadas" });
    try {
      const categoryCreated = await createCategory({
        category,
        repository: categoryRepository,
      });

      res.status(201).json({
        message: "Categoria criada com sucesso",
        result: categoryCreated,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  }
  async update(req, res) {
    if (req.body.id && !req.body._id) {
      req.body._id = req.body.id;
    }
    const category = new categoryDTO(req.body);
    const { categoryRepository, updateCategory } = this.di;

    try {
      const categoryUpdated = await updateCategory({
        category,
        repository: categoryRepository,
      });

      res.status(201).json({
        message: "Categoria atualizada com sucesso",
        result: categoryUpdated,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  }
  async remove(req, res) {
    if (req.body.id && !req.body._id) {
      req.body._id = req.body.id;
    }
    const category = new categoryDTO(req.body);
    const { categoryRepository, removeCategory } = this.di;

    try {
      const categoryRemoved = await removeCategory({
        category,
        repository: categoryRepository,
      });

      res.status(201).json({
        message: "Categoria removida com sucesso",
        result: categoryRemoved,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  }
  async find(req, res) {
    const { categoryRepository, getCategory } = this.di;
    try {
      const categories = await getCategory({ repository: categoryRepository });
      res.status(200).json({
        message: "Categoria carregado com sucesso",
        result: categories,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro no servidor",
      });
    }
  }
}

module.exports = CategoryController;
