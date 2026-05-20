import { findAccountById, updateAccount } from '#models/accounts';
import { AccountUpdateData } from '#schemas/accounts';
import { Request, Response } from 'express';

export async function showAccount(req: Request, res: Response) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const account = await findAccountById(req.user.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const { password: _password, ...safeAccount } = account;
    return res.status(200).json({ account: safeAccount });
  } catch (error) {
    console.error('Error fetching account:', error);
    return res.status(500).json({ error: 'Failed to fetch account' });
  }
}

export async function updateAccountInfo(req: Request, res: Response) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const accountUpdateInput = AccountUpdateData.safeParse(req.body);
    if (!accountUpdateInput.success) {
      return res.status(400).json({ error: accountUpdateInput.error.issues });
    }

    const updatedAccount = await updateAccount(req.user.id, accountUpdateInput.data);
    if (!updatedAccount) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const { password: _password, ...safeAccount } = updatedAccount;
    return res.status(200).json({ account: safeAccount });
  } catch (error) {
    console.error('Error updating account:', error);
    return res.status(500).json({ error: 'Failed to update account' });
  }
}
