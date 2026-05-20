import db from '#config/database';
const TABLE = 'account';

type AccountCreateData = {
  name: string;
  email: string;
  password_hash: string;
};

type AccountUpdateData = {
  name?: string;
  email?: string;
  password_hash?: string;
};

function baseQuery(trx = db) {
  return trx(TABLE);
}

export async function listAccounts() {
  const qb = baseQuery().select('*');
  return qb;
}

export async function findAccountById(id: number) {
  const qb = baseQuery().where({ id }).first();
  return qb;
}

export async function findAccountByEmail(email: string) {
  const qb = baseQuery().where({ email }).first();
  return qb;
}

export async function createAccount(accountData: AccountCreateData) {
  const { name, email, password_hash } = accountData;
  const newAccount = await baseQuery().insert({ name, email, password_hash });
  const newAccountData = await findAccountById(newAccount[0]);
  return newAccountData;
}

export async function updateAccount(id: number, accountData: AccountUpdateData) {
  const updatedAccount = await baseQuery().where({ id }).update(accountData);
  return updatedAccount;
}

export async function deleteAccount(id: number) {
  const deletedAccount = await baseQuery().where({ id }).delete();
  return deletedAccount;
}
