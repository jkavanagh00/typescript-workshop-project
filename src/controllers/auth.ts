import { createAccount, findAccountByEmail } from '#models/accounts';
import { LoginInputData } from '#schemas/auth';
import { AccountInputData } from '#schemas/accounts';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export async function register(req: Request, res: Response) {
  const registrationInput = AccountInputData.safeParse(req.body);
  if (!registrationInput.success) {
    return res.status(400).json({ error: registrationInput.error.issues });
  }
  try {
    const { name, email, password } = registrationInput.data;
    const passwordHash = await bcrypt.hash(password, 12)
    const newAccount = await createAccount({ name, email, password_hash: passwordHash });
    const token = jwt.sign({ id: newAccount.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error registering account:', error);
    res.status(500).json({ error: 'Failed to register account' });
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
    if (!account || account.password_hash !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: account.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
}
