const { DetailedAccount, Transaction } = require('../modelos');

const create = async (action) => {
  const detailedAccount = new DetailedAccount(action);
  return detailedAccount.save();
};

const getById = async (id) => {
  return DetailedAccount.findById(id);
};

const get = async (detailedAccount = {}) => {
  return DetailedAccount.find(detailedAccount);
};

const createTransaction = async (transaction) => {
  const newTransaction = new Transaction(transaction);
  return newTransaction.save();
};

module.exports = {
  create,
  getById,
  get,
  createTransaction,
};
