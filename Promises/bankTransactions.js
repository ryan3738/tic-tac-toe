const { VALID, INVALID, buildTransaction } = require('./utils/transactions');

function makeTransactions(accounts, transactions) {
  // TODO: implement this function
  // TODO: implement error handling
  async function processTransactions(accountsPromise) {
    const newAccountBalances = accountsPromise;
    // Return accounts unmodified if no transactions are present
    if (transactions.length <= 0) {
      console.log('No Transactions Submitted...');
      return newAccountBalances;
    }

    if (transactions.length > 0) {
      console.log('Processing Transactions...');

      for await (const transaction of transactions) {
        const { from, to, amount, validate } = transaction;
        // console.log('---TRANSACTION---', transaction);
        //  Validate each transaction using validate() function
        await validate()
          .then(() => {
            console.log(
              `---Transaction Approved for $${amount} from account #${from} to account #${to}---`
            );
            //  If transaction is validated change to account
            newAccountBalances[from] -= amount;
            //  If transaction is validated change from account
            newAccountBalances[to] += amount;
            console.log(
              'Transaction complete, updated account balances',
              newAccountBalances
            );
          })
          .catch((err) =>
            console.error(
              `---Transaction Rejected for $${amount} from account #${from} to account #${to}---`,
              `---Reason: ${err}`
            )
          );
      }
      console.log('Transactions Complete...');
      return newAccountBalances;
    }
  }

  return Promise.resolve((() => processTransactions(accounts))());
}

module.exports = { makeTransactions };

// * Test Cases

// (async () => {
//   const accounts = {
//     1: 10,
//     2: 20,
//     3: 30,
//   };
//   const transactions = [
//     buildTransaction(1, 2, 2000, INVALID, 100),
//     buildTransaction(2, 1, 2000, INVALID, 200),
//   ];

//   const correctAccountsAfterTransactions = {
//     1: 10,
//     2: 20,
//     3: 30,
//   };

//   const accountsAfterTransactions = await makeTransactions(
//     accounts,
//     transactions
//   );
// })();

(async () => {
  const accounts = {
    1: 100,
    2: -20,
    3: 150,
    4: 30,
  };
  const transactions = [
    buildTransaction(1, 2, 70, INVALID, 10),
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
  // console.log('ACCOUNTS AFTER TRANSACTIONS', await accountsAfterTransactions);
})();
