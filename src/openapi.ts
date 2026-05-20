import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { AccountInputData, AccountUpdateData } from '#schemas/accounts';
import { LoginInputData } from '#schemas/auth';
import { CartItemInputData } from '#schemas/cart_items';
import { ToyInputData, ToyUpdateData } from '#schemas/toys';

const registry = new OpenAPIRegistry();

// Security scheme
registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

// Reusable schemas
const AccountInputSchema = registry.register('AccountInput', AccountInputData as any);
const AccountUpdateSchema = registry.register('AccountUpdate', AccountUpdateData as any);
const LoginInputSchema = registry.register('LoginInput', LoginInputData as any);
const CartItemInputSchema = registry.register('CartItemInput', CartItemInputData as any);
const ToyInputSchema = registry.register('ToyInput', ToyInputData as any);
const ToyUpdateSchema = registry.register('ToyUpdate', ToyUpdateData as any);

// ── Auth ──────────────────────────────────────────────────────────────────────

registry.registerPath({
  method: 'post',
  path: '/auth/register',
  tags: ['Auth'],
  summary: 'Register a new account',
  request: {
    body: { content: { 'application/json': { schema: AccountInputSchema as any } } },
  },
  responses: {
    201: { description: 'Returns a JWT token' },
    400: { description: 'Validation error' },
    500: { description: 'Server error' },
  },
});

registry.registerPath({
  method: 'post',
  path: '/auth/login',
  tags: ['Auth'],
  summary: 'Login to an existing account',
  request: {
    body: { content: { 'application/json': { schema: LoginInputSchema as any } } },
  },
  responses: {
    200: { description: 'Returns a JWT token' },
    400: { description: 'Validation error' },
    401: { description: 'Invalid credentials' },
    500: { description: 'Server error' },
  },
});

// ── Accounts ──────────────────────────────────────────────────────────────────

registry.registerPath({
  method: 'get',
  path: '/accounts',
  tags: ['Accounts'],
  summary: 'Get the authenticated account',
  security: [{ bearerAuth: [] }],
  responses: {
    200: { description: 'Account details' },
    401: { description: 'Unauthorized' },
    404: { description: 'Account not found' },
  },
});

registry.registerPath({
  method: 'put',
  path: '/accounts',
  tags: ['Accounts'],
  summary: 'Update the authenticated account',
  security: [{ bearerAuth: [] }],
  request: {
    body: { content: { 'application/json': { schema: AccountUpdateSchema as any } } },
  },
  responses: {
    200: { description: 'Updated successfully' },
    400: { description: 'Validation error' },
    401: { description: 'Unauthorized' },
    500: { description: 'Server error' },
  },
});

// ── Toys ──────────────────────────────────────────────────────────────────────

registry.registerPath({
  method: 'get',
  path: '/toys',
  tags: ['Toys'],
  summary: 'List all toys',
  responses: {
    200: { description: 'List of toys' },
  },
});

registry.registerPath({
  method: 'get',
  path: '/toys/{id}',
  tags: ['Toys'],
  summary: 'Get a toy by ID',
  request: {
    params: z.object({ id: z.string() }) as any,
  },
  responses: {
    200: { description: 'Toy details' },
    400: { description: 'Invalid ID' },
    404: { description: 'Toy not found' },
  },
});

registry.registerPath({
  method: 'post',
  path: '/toys',
  tags: ['Toys'],
  summary: 'Create a new toy',
  request: {
    body: { content: { 'application/json': { schema: ToyInputSchema as any } } },
  },
  responses: {
    201: { description: 'Toy created' },
    400: { description: 'Validation error' },
    500: { description: 'Server error' },
  },
});

registry.registerPath({
  method: 'put',
  path: '/toys/{id}',
  tags: ['Toys'],
  summary: 'Update a toy',
  request: {
    params: z.object({ id: z.string() }) as any,
    body: { content: { 'application/json': { schema: ToyUpdateSchema as any } } },
  },
  responses: {
    200: { description: 'Toy updated' },
    400: { description: 'Validation error' },
    404: { description: 'Toy not found' },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/toys/{id}',
  tags: ['Toys'],
  summary: 'Delete a toy',
  request: {
    params: z.object({ id: z.string() }) as any,
  },
  responses: {
    200: { description: 'Toy deleted' },
    400: { description: 'Invalid ID' },
    404: { description: 'Toy not found' },
  },
});

// ── Carts ─────────────────────────────────────────────────────────────────────

registry.registerPath({
  method: 'get',
  path: '/carts',
  tags: ['Carts'],
  summary: "Get the authenticated user's cart",
  security: [{ bearerAuth: [] }],
  responses: {
    200: { description: 'Cart with items' },
    401: { description: 'Unauthorized' },
    404: { description: 'Cart not found' },
  },
});

registry.registerPath({
  method: 'post',
  path: '/carts',
  tags: ['Carts'],
  summary: 'Create a cart for the authenticated user',
  security: [{ bearerAuth: [] }],
  responses: {
    201: { description: 'Cart created' },
    401: { description: 'Unauthorized' },
    500: { description: 'Server error' },
  },
});

registry.registerPath({
  method: 'post',
  path: '/carts/items',
  tags: ['Carts'],
  summary: 'Add an item to the cart',
  security: [{ bearerAuth: [] }],
  request: {
    body: { content: { 'application/json': { schema: CartItemInputSchema as any } } },
  },
  responses: {
    201: { description: 'Item added' },
    401: { description: 'Unauthorized' },
    404: { description: 'Cart not found' },
    500: { description: 'Server error' },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/carts/items/{id}',
  tags: ['Carts'],
  summary: 'Remove an item from the cart',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }) as any,
  },
  responses: {
    200: { description: 'Item removed' },
    401: { description: 'Unauthorized' },
    404: { description: 'Cart or item not found' },
    500: { description: 'Server error' },
  },
});

// ── Generate ──────────────────────────────────────────────────────────────────

const generator = new OpenApiGeneratorV3(registry.definitions);

export default generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'Toy Shop API',
    version: '1.0.0',
  },
});
