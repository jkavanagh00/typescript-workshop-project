import db from '#config/database';
const TABLE = 'account';
import { AccountId, AccountInput, AccountUpdate } from '#schemas/types';

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
  const newAccount = await baseQuery().insert({ name, email, password }).returning('*');
  return newAccount[0];
}

export async function updateAccount(id: number, accountData: AccountUpdate) {
  const { name, email, password } = accountData;
  const updatedAccount = await baseQuery()
    .where({ id })
    .update({ name, email, password })
    .returning('*');
  return updatedAccount[0];
}

export async function deleteAccount(id: number) {
  const deletedAccount = await baseQuery()
    .where({ id })
    .delete()
    .returning('*');
  return deletedAccount[0];
}