async function makeTransactions(accounts, transactions) {
  // TODO: implement this function
  // const newAccountBalances = accounts;
  // console.log('Account Balances:', accounts);
  // console.log('New Account Balances:', newAccountBalances);

  const getNewAccountBalance = async () => {
    let newAccountBalances = accounts;
    console.log('New Account Balances:', newAccountBalances);

    if (transactions.length <= 0) {
      console.log('No Transactions Submitted...');
      newAccountBalances = await accounts;
      return newAccountBalances;
    }
    // await transactions.forEach((transaction) =>
    //   console.log('---TRANSACTION---', transaction)
    // );
  };

  if (transactions.length <= 0) {
    return;
  }
  //   if (transactions.length > 0) {
  //     await transactions.forEach((transaction) =>
  //       console.log('---TRANSACTION---', transaction)
  //     );
  //   }
  // };

  // console.log('---getNewAccountBalance:', getNewAccountBalance());

  // if (transactions.length > 0) {
  //   console.log('Processing Transactions...');

  //   for (const transaction of transactions) {
  //     const { from, to, amount, validate } = transaction;
  //     // console.log('transaction', transaction)
  //     // console.log('VALIDATION', validate());
  //     validate()
  //       .then(() => {
  //         console.log(
  //           `---Transaction Approved for $${amount} from account #${from} to account #${to}---`
  //         );
  //         console.log('FROM:', from);
  //         console.log('TO:', to);
  //         console.log('AMOUNT', amount);
  //         console.log('Current FROM Balance', newAccountBalances[from]);
  //         console.log('Current TO Balance', newAccountBalances[to]);
  //         console.log(
  //           'Transaction complete, here are the updated balances',
  //           newAccountBalances
  //         );
  //         newAccountBalances[from] -= amount;
  //       })
  //       .catch((err) => console.error('Transaction Error', err));
  //     //  TODO: For each transation check if transaction is validated
  //   }
  //   //  TODO: If transaction is validated change to account
  //   //  TODO: If transaction is validated change from account

  //   console.log(
  //     'Transactions complete, sending updated account balances',
  //     newAccountBalances
  //   );
  // }
  // console.log('accounts:',accounts)
  // console.log('transactions:',transactions)
  // console.log('newAccountBalances:', newAccountBalances)
  return Promise.resolve(accounts);
}

// TODO: Testing Code

const { VALID, INVALID, buildTransaction } = require('./utils/transactions');

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
  console.log('Accounts After Transactions', accountsAfterTransactions);
})();
