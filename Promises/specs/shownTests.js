const { expect } = require('chai');
const { makeTransactions } = require('../bankTransactions');
const { VALID, INVALID, buildTransaction } = require('../utils/transactions');

describe('makeTransactions', () => {
  it('works when there are no transactions', async () => {
    const accounts = {
      1: 100,
      2: 200,
    };
    const transactions = [];

    const correctAccountsAfterTransactions = {
      1: 100,
      2: 200,
    };

    const accountsAfterTransactions = await makeTransactions(
      accounts,
      transactions
    );

    expect(accountsAfterTransactions).to.deep.equal(
      correctAccountsAfterTransactions
    );
  });

  it('works when all transactions are rejected', async () => {
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

    expect(accountsAfterTransactions).to.deep.equal(
      correctAccountsAfterTransactions
    );
  });

  it('works when all transactions are approved', async () => {
    const accounts = {
      1: 100,
      2: -20,
      3: 150,
      4: 30,
    };
    const transactions = [
      buildTransaction(1, 2, 70, VALID, 10),
      buildTransaction(4, 3, 100, VALID, 30),
      buildTransaction(2, 4, 50, VALID, 15),
    ];

    const correctAccountsAfterTransactions = {
      1: 100 - 70,
      2: -20 + 70 - 50,
      3: 150 + 100,
      4: 30 - 100 + 50,
    };

    const accountsAfterTransactions = await makeTransactions(
      accounts,
      transactions
    );

    expect(accountsAfterTransactions).to.deep.equal(
      correctAccountsAfterTransactions
    );
  });

  it('works when transactions are approved or rejected arbitrarily', async () => {
    const accounts = {
      1: 40,
      2: 300,
      3: 0,
    };
    const transactions = [
      buildTransaction(3, 2, 20, VALID, 10),
      buildTransaction(1, 3, 2000, INVALID, 10),
      buildTransaction(1, 3, 10, VALID, 50),
      buildTransaction(2, 1, 100, VALID, 200),
      buildTransaction(2, 3, 100, INVALID, 200),
    ];
    const correctAccountsAfterTransactions = {
      1: 40 - 10 + 100,
      2: 300 + 20 - 100,
      3: 0 - 20 + 10,
    };

    const accountsAfterTransactions = await makeTransactions(
      accounts,
      transactions
    );

    expect(accountsAfterTransactions).to.deep.equal(
      correctAccountsAfterTransactions
    );
  });
});
