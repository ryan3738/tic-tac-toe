const { makeTransactions } = require('../bankTransactions');
const { VALID, INVALID, buildTransaction } = require('../utils/transactions');

(async () => {
  const accounts = {
    1: 10,
    2: 20,
    3: 30,
  };
  const transactions = [
    buildTransaction(1, 2, 2000, INVALID, 100),
    buildTransaction(2, 1, 2000, INVALID, 200),
  ];

  const correctAccountsAfterTransactions = {
    1: 10,
    2: 20,
    3: 30,
  };

  const accountsAfterTransactions = await makeTransactions(
    accounts,
    transactions
  );
})();
