import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { ExpressAuth } from '@auth/express';
import { currentSession, authenticatedUser } from './middleware/auth.js';
import { authConfig } from './config/auth.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(currentSession);

app.use('/api/auth/*', ExpressAuth(authConfig));

app.get('/', async (req, res) => {
	return res.json(res.locals.session?.user);
});

app.get('/api/protected', authenticatedUser, async (req, res) => {
	res.json(res.locals.session);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server running on port ${PORT}.`));

export default app;
