import './setup-zod'; // must be first — patches z before any schema module loads
import express, { Application, Request, Response } from 'express';
import toysRouter from './routes/toys';
import accountsRouter from './routes/accounts';
import authRouter from './routes/auth';
import cartsRouter from './routes/carts';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import openApiDocument from './openapi';
const app: Application = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/toys', toysRouter);
app.use('/accounts', accountsRouter);
app.use('/auth', authRouter);
app.use('/carts', cartsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: 'Hello World Updated!',
  });
});

app.post('/post', async (req: Request, res: Response): Promise<Response> => {
  console.log(req.body);
  return res.status(200).send({
    message: 'Hello World from post !',
  });
});

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}
