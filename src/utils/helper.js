import jwt from 'jsonwebtoken';
import constant from './constant';
import { AuthenticationError } from 'apollo-server';

// Ref: https://github.com/trungquan17/nodejs-jwt-authenticate-user/blob/master/src/helpers/jwt.helper.js

const generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    const userData = {
      _id: user._id,
      username: user.username,
      name: user.name,
      avatar: user.avatar,
    };
    jwt.sign(
      { data: userData },
      secretSignature,
      {
        algorithm: constant.jwt.hashAlgorithm,
        expiresIn: tokenLife,
      },
      (err, token) => {
        return err ? reject(err) : resolve(token);
      },
    );
  });
};

const verifyToken = (token, secretSignature) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretSignature, null, (err, decoded) => {
      return err ? reject(err) : resolve(decoded);
    });
  });
};

const getTokenFromHeaderOrQueryString = req => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }

  return null;
};

const isAuth = async req => {
  const token = getTokenFromHeaderOrQueryString(req);
  if (!token) {
    return false;
  }
  try {
    let decoded = await verifyToken(token, constant.jwt.secretSignature);
    req.user = decoded.data;
    return true;
  } catch (err) {
    return false;
  }
};

const assertAuthentication = req => {
  if (!req || !req.user) throw new AuthenticationError('error.authenticate.unauthenticate');
};

const handleError = (res, err, statusCode = constant.statusCode.badRequest) => {
  res.status(statusCode).json({ message: err.toString() });
};

module.exports = {
  jwt: {
    generateToken: generateToken,
    verifyToken: verifyToken,
    getTokenFromHeaderOrQueryString: getTokenFromHeaderOrQueryString,
    isAuth: isAuth,
  },
  route: {
    assertAuthentication: assertAuthentication,
    handleError: handleError,
  },
};
