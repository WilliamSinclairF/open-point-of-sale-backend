import { getConnection } from 'typeorm';
import { User } from './../entity/User';
import { NextFunction, Request, Response } from 'express';
import admin, { ServiceAccount } from 'firebase-admin';

import serviceAccount from '../firebase-admin.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

export async function decodeIDToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers?.authorization;

  if (!authHeader || !authHeader?.startsWith('Bearer')) {
    return res.status(400).json({ ok: false, data: 'Invalid authorization' });
  }

  const idToken = authHeader.split(' ')[1];

  if (!idToken) {
    return res.status(400).json({ ok: false, data: 'Invalid authorization' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req['currentUser'] = decodedToken;
    console.log(decodedToken);
    if (req.currentUser.uid) {
      const userInDatabase = await User.findOne({ uid: req.currentUser.uid });

      if (!userInDatabase) {
        const connection = getConnection();
        const user = new User();
        user.uid = req.currentUser.uid;
        user.email = req.currentUser.email!;
        const result = await connection.manager.save(user);
        req.currentUser.id = result.id;
        return next();
      }

      if (req.currentUser.email !== userInDatabase?.email) {
        userInDatabase.email = req.currentUser.email!;
        await userInDatabase.save();
      }

      req.currentUser.id = userInDatabase.id;
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, data: 'Server error' });
  }

  return next();
}
