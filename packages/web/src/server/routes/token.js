import firebase from 'firebase-admin';

export const createToken = async (req, res) => {
  const { token } = req.body;
  firebase
    .auth()
    .verifyIdToken(token)
    .then(decodedToken => {
      req.session.decodedToken = decodedToken;
      return decodedToken;
    })
    .then(decodedToken => res.json({ status: true, decodedToken }))
    .catch(error => res.json({ error }));
};

export const deleteToken = async (req, res) => {
  req.session.decodedToken = null;
  req.session.destroy();
  res.json({ status: true });
};
