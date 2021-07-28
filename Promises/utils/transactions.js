const VALID = true;
const INVALID = false;

function buildTransaction(from, to, amount, isValid, time) {
  return {
    from,
    to,
    amount,
    validate: () =>
      new Promise((resolve, reject) => {
        setTimeout(() => (isValid ? resolve() : reject()), time);
      }),
  };
}

module.exports = { VALID, INVALID, buildTransaction };
