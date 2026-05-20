import { createAccount, findAccountByEmail } from '#models/accounts';
import { LoginInputData } from '#schemas/auth';
import { AccountInputData } from '#schemas/accounts';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.warn('JWT_SECRET is not set. Using a local development fallback secret.');
    return 'dev-local-jwt-secret';
  }

  throw new Error('JWT_SECRET is required in production');
}

export async function register(req: Request, res: Response) {
  const registrationInput = AccountInputData.safeParse(req.body);
  if (!registrationInput.success) {
    return res.status(400).json({ error: registrationInput.error.issues });
  }
  try {
    const { name, email, password } = registrationInput.data;

    const existingAccount = await findAccountByEmail(email);
    if (existingAccount) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    const newAccount = await createAccount({ name, email, password });
    const token = jwt.sign({ id: newAccount.id }, getJwtSecret(), { expiresIn: '1h' });
    return res.status(201).json({ token });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    console.error('Error registering account:', error);
    return res.status(500).json({ error: 'Failed to register account' });
  }
}

export async function login(req: Request, res: Response) {
  const loginInput = LoginInputData.safeParse(req.body);
  if (!loginInput.success) {
    return res.status(400).json({ error: loginInput.error.issues });
  }
  try {
    const { email, password } = loginInput.data;
    const account = await findAccountByEmail(email);
    if (!account || account.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: account.id }, getJwtSecret(), { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
}
