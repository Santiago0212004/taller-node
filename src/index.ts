import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import { db } from './config/db';

dotenv.config();
import { router as user } from './routes/user.routes';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.use('/api/users', user);

db.then(() => {
    app.listen(port, () => {
        console.log(`Server is running  on port ${port}`);
    });
})