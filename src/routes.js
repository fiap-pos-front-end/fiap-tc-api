const { Router } = require('express');
const AccountController = require('./controller/Account');
const accountController = new AccountController({});
const CategoryController = require('./controller/Category');
const categoryController = new CategoryController({});
const router = Router();

/**
 * @swagger
 * /account:
 *   get:
 *     summary: Busca contas
 *     tags: [Contas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contas encontradas
 */
router.get('/account', accountController.find.bind(accountController));

router.post('/transaction/create', accountController.createNewTransaction.bind(accountController));

/**
 * @swagger
 * /account/transaction:
 *   post:
 *     summary: Cria uma nova transação
 *     tags: [Transações]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Transação criada com sucesso
 */
router.post('/account/transaction', accountController.createTransaction.bind(accountController));

/**
 * @swagger
 * /account/{accountId}/statement:
 *   get:
 *     summary: Obtém extrato da conta
 *     tags: [Extratos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         description: ID da conta
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Extrato encontrado
 *       401:
 *         description: Token invalido
 */
router.get('/account/:accountId/statement', accountController.getStatment.bind(accountController));

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Busca categorias
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias encontradas
 */
router.get('/category', categoryController.find.bind(categoryController));

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 */
router.post('/category', categoryController.create.bind(categoryController));

/**
 * @swagger
 * /category:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Categoria atualizada com sucesso
 */
router.put('/category', categoryController.update.bind(categoryController));

/**
 * @swagger
 * /category:
 *   delete:
 *     summary: Remove uma categoria
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Categoria removida com sucesso
 */
router.delete('/category', categoryController.remove.bind(categoryController));

module.exports = router;
