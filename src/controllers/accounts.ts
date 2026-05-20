import { findAccountById, updateAccount } from '#models/accounts';
import { AccountUpdateData } from '#schemas/accounts';
import { Request, Response } from 'express';

function toPublicAccount(account: { id: number; name: string; email: string }) {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
  };
}

export async function showAccount(req: Request, res: Response) {
  try {
    const account = await findAccountById(req.user!.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.status(200).json({ account: toPublicAccount(account) });
  } catch (error) {
    console.error('Error fetching account:', error);
    res.status(500).json({ error: 'Failed to fetch account' });
  }
}

export async function updateAccountInfo(req: Request, res: Response) {
  try {
    const accountUpdateInput = AccountUpdateData.safeParse(req.body);
    if (!accountUpdateInput.success) {
      return res.status(400).json({ error: accountUpdateInput.error.issues });
    }
    const updatedAccount = await updateAccount(req.user!.id, accountUpdateInput.data);
    if (!updatedAccount) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.status(200).json({ account: updatedAccount });
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({ error: 'Failed to update account' });
  }
}
