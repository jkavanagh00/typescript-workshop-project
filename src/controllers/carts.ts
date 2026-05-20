import { createCart } from '#models/carts';
import { listCartItems, createCartItem, deleteCartItem } from '#models/cart_items';
import { findCartByAccountId } from '#models/carts';
import { AccountIdParam } from '#schemas/accounts';
import { CartItemIdParam, CartItemInputData } from '#schemas/cart_items';
import { CartInput } from '#schemas/types';
import { Request, Response } from 'express';

export async function getOwnCart(req: Request, res: Response) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const accountId = AccountIdParam.safeParse({ id: req.user?.id });
    if (!accountId.success) {
      return res.status(400).json({ error: accountId.error.issues });
    }
    const cart = await findCartByAccountId(accountId.data.id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    const cartItems = await listCartItems(cart.id);
    res.status(200).json({ cart, items: cartItems });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
}

export async function addCart(req: Request, res: Response) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const accountId = AccountIdParam.safeParse({ id: req.user?.id });
    if (!accountId.success) {
      return res.status(400).json({ error: accountId.error.issues });
    }
    const cartInput: CartInput = {
      account_id: accountId.data.id,
      status: 'active',
    };
    const newCart = await createCart(cartInput);
    res.status(201).json({ cart: newCart });
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ error: 'Failed to create cart' });
  }
}

export async function addItemToCart(req: Request, res: Response) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const accountId = AccountIdParam.safeParse({ id: req.user?.id });
    if (!accountId.success) {
      return res.status(400).json({ error: accountId.error.issues });
    }
    const cart = await findCartByAccountId(accountId.data.id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    const cartItemInput = CartItemInputData.safeParse({
      cart_id: cart.id,
      toy_id: req.body.toy_id,
      quantity: req.body.quantity,
    });

    if (!cartItemInput.success) {
      return res.status(400).json({ error: cartItemInput.error.issues });
    }

    const newCartItem = await createCartItem(cartItemInput.data);
    res.status(201).json({ item: newCartItem });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
}

export async function removeItemFromCart(req: Request, res: Response) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const accountId = AccountIdParam.safeParse({ id: req.user?.id });
    if (!accountId.success) {
      return res.status(400).json({ error: accountId.error.issues });
    }
    const cart = await findCartByAccountId(accountId.data.id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    const cartItemId = CartItemIdParam.safeParse(req.params);
    if (!cartItemId.success) {
      return res.status(400).json({ error: cartItemId.error.issues });
    }

    const deletedItem = await deleteCartItem(cartItemId.data.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.status(200).json({ item: deletedItem });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
}
