import db from '#config/database';
const TABLE = 'account';
import { AccountInput, AccountUpdate } from '#schemas/types';

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

export async function createAccount(accountData: AccountInput) {
  const { name, email, password } = accountData;
  const newAccount = await baseQuery().insert({ name, email, password });
  const newAccountData = await findAccountById(newAccount[0]);
  return newAccountData;
}

export async function updateAccount(id: number, accountData: AccountUpdate) {
  const { name, email, password } = accountData;
  const updatedAccount = await baseQuery()
    .where({ id })
    .update({ name, email, password });
  return updatedAccount;
}

export async function deleteAccount(id: number) {
  const deletedAccount = await baseQuery()
    .where({ id })
    .delete();
  return deletedAccount;
}