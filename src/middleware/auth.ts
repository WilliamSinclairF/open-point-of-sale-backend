import { getConnection } from 'typeorm';
import { User } from './../entity/User';
import { NextFunction, Request, Response } from 'express';
import admin, { ServiceAccount } from 'firebase-admin';

const serviceAccount = {
  type: process.env.FB_TYPE,
  project_id: process.env.FB_PROJECT_ID,
  private_key_id: process.env.FB_PRIVATE_KEY_ID,
  private_key: process.env.FB_PRIVATE_KEY,
  client_email: process.env.FB_CLIENT_EMAIL,
  client_id: process.env.FB_CLIENT_ID,
  auth_uri: process.env.FB_AUTH_URI,
  token_uri: process.env.FB_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FB_AUTH_PROVIDER,
  client_x509_cert_url: process.env.FB_CLIENT_CERT_URL,
};

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
