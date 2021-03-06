const { AuthenticateError } = require('../../errors/general');
const { UserModel } = require('../../database/models');

/**
 * @param {{username:string,password:string}|undefined} credentials credentials used to verify user if not find user in User collection
 */
function basicAuthMiddleware(credentials) {
  return async (req, res, next) => {
    try {
      let base64Credentials;
      try {
        const [authName, authInfo] = req.headers.authorization.split(' ');
        if (authName !== 'Basic') {
          throw new Error();
        } else {
          base64Credentials = authInfo;
        }
        if (!base64Credentials) {
          throw new Error();
        }
      } catch (e) {
        return next(new AuthenticateError('Invalid Authorization header format. Format is "{AUTHORIZATION_TYPE} {TOKEN|API_KEY}". For jwt authorization use Basic type'));
      }

      const [username, password] = Buffer.from(base64Credentials, 'base64').toString('ascii').split(':');

      // If credentials passed check them
      if (credentials) {
        if (username !== credentials.username || password !== credentials.password) {
          throw new Error();
        }
        req.username = username;
        return next();
      }
      // Use User model to verify
      const user = await UserModel.findOne({ username }).select('+password');
      if (!user || !UserModel.checkPassword(password, user.password)) {
        throw new Error();
      }
      req.user = user;
      return next();
    } catch (exception) {
      return next(new AuthenticateError('Invalid token'));
    }
  };
}


module.exports = basicAuthMiddleware;
