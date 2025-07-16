const { Transaction } = require('../../infra/mongoose/modelos');

const saveTransaction = async ({ transaction, repository }) => {
  const shouldReverseValue =
    (transaction.type === 'Debit' && transaction.value > 0) || (transaction.type === 'Credit' && transaction.value < 0);
  if (shouldReverseValue) transaction.value = transaction.value * -1;

  const resultado = await repository.createTransaction(transaction);
  return new Transaction(resultado.toJSON());
};

module.exports = saveTransaction;
