class Transaction {
  constructor({ _id, type, amount, date, category }) {
    this.id = _id;
    this.type = type;
    this.amount = amount;
    this.date = date;
    this.category = category;
  }
}

module.exports = Transaction;
