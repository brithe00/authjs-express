import { getSession } from '@auth/express';
import { authConfig } from '../config/auth.js';

export const authenticatedUser = async (req, res, next) => {
	const session =
		res.locals.session ?? (await getSession(req, authConfig)) ?? undefined;

	res.locals.session = session;

	if (session) {
		return next();
	}

	res.status(400).json({ message: 'Not Authenticated' });
};

export const currentSession = async (req, res, next) => {
	const session = (await getSession(req, authConfig)) ?? undefined;
	res.locals.session = session;
	return next();
};
