import * as randomstring from 'randomstring';

export const GenerateTransactionId = () => {
  const random = randomstring.generate({
    length: 14,
    charset: 'numeric',
  });
  const randomString = randomstring.generate({
    length: 1,
    charset: 'alphabetic',
  });
  const TransactionId = randomString + random;
  return TransactionId;
};
