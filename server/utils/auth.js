const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

//// TODO: Update the auth middleware function to work with the GraphQL API. ////
module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({req}) { // Need to remove res, next from params, make req into object
    // original code below only allows token to be sent via req.query or headers
    // let token = req.query.token || req.headers.authorization;
    // This allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"] // We split the token string into an array and return actual token
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req; // Instead of returning: res.status(400).json({ message: 'You have no token!' }), just return: req
    }

    // verify token and get user data out of it 
    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      // return res.status(400).json({ message: 'invalid token!' }); // This is not needed
    }

    // Instead of sending to next endpoint we will return req
    // send to next endpoint
    // next();
    // return the request object so it can be passed to the resolver as `context`
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
