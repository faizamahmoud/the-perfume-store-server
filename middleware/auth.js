// * boilerplate
//  import passport tools
// Require the needed npm packages
const passport = require("passport");
const bcrypt = require("bcrypt"); // dehashing of req.body
const jwt = require("jsonwebtoken");

// iniitializing passport middleware
// returning several helper functions


// Require the specific `strategy` we'll use to authenticate
// Require the method that will handle extracting the token
// from each of the requests sent by clients
const { Strategy, ExtractJwt } = require("passport-jwt"); // todo: inspect passport-jwt docs

// User model import, accessed by JWT verify function
const User = require("../models/User");

///////////////////////////////
// CONFIGURATION
////////////////////////////////

// Create a secret to be used to encrypt/decrypt the token
// This can be any string value you want -- even gibberish.

const secret = process.env.JWT_SECRET || "yolo unique secrets";

// Minimum required options for passport-jwt

const opts = {
	// How passport should find and extract the token from
	// the request.  We'll be sending it as a `bearer` token
	// when we make requests from our front end.
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // !when we send a request, there should be a headers object in fetch
	// Any secret string to use that is unique to your app
	// We should store this in an environment variable so it
	// isn't ever pushed to GitHub!
	secretOrKey: secret
};

///////////////////////////////
// AUTHENTICATION FUNCTIONALITY
////////////////////////////////
// jwt_payload - looking for de-cyrped info
const verify = async (jwt_payload, done) => {
	// In the callback we run our custom code. With the data extracted from
	// the token that we're passed as jwt_payload we'll have the user's id.
	// Using Mongoose's `.findById()` method, we find the user in our database
	try {
		// To pass the user on to our route, we use the `done` method that
		// that was passed as part of the callback.  The first parameter of
		// done is an error, so we'll pass null for that argument and then
		// pass the user doc from Mongoose
		const user = await User.findById(jwt_payload.id);
		return done(null, user);
	} catch (err) {
		// If there was an error, we pass it to done so it is eventually handled
		// by error handlers in Express
		return done(err);
	}

};

// We're configuring the strategy using the constructor from passport
// so we call new and pass in the options we set in the `opts` variable.
// Then we pass it a callback function that passport will use when we call
// this as middleware.  The callback will be passed the data that was
// extracted and decrypted by passport from the token that we get from
// the client request!  This data (jwt_payload) will include the user's id!

const strategy = new Strategy(opts, verify);

// Now that we've constructed the strategy, we 'register' it so that
// passport uses it when we call the `passport.authenticate()`
// method later in our routes
passport.use(strategy);

// Initialize the passport middleware based on the above configuration
passport.initialize();

// Create a variable that holds the authenticate method so we can
// export it for use in our routes
// * like a key to a door
const requireToken = passport.authenticate("jwt", { session: false });

// Create a function that takes the request and a user document
// and uses them to create a token to send back to the user
const createUserToken = (req, user) => {
	// Make sure that we have a user, if it's null that means we didn't
	// find the email in the database.  If there is a user, make sure
	// that the password is correct.  For security reason, we don't want
	// to tell the client whether the email was not found or that the
	// password was incorrect.  Instead we send the same message for both
	// making it much harder for hackers.

	if (
		!user ||
		!req.body.password ||
		!bcrypt.compareSync(req.body.password, user.password) //if password is not a match
	) {
		const error = new Error("The provided username or password is incorrect");
		error.statusCode = 422;
		throw error;
	}

	// If no error was thrown, we create the token from user's id and
	// return the token
	return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 });
};

// user items 
const handleValidateOwnership = (req, document) => {
	const ownerId = document.owner._id || document.owner;

	// Check if the current user is also the owner of the document

	if (!req.user._id.equals(ownerId)) {
		throw Error("Unauthorized Access");
	} else {
		return document;
	}
};

const handleUserValidateOwnership = (req, document) => {
	const ownerId = document._id;

	// Check if the current user is also the owner of the document

	if (!req.user._id.equals(ownerId)) {
		throw Error("Unauthorized Access, no token");
	} else {
		return document;
	}
};



const isAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
      const user = await User.findById(decode.userId);
      if (!user) {
        return res.json({ success: false, message: 'unauthorized access!' });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.json({ success: false, message: 'unauthorized access!' });
      }
      if (error instanceof jwt.TokenExpiredError) {
        return res.json({
          success: false,
          message: 'session expired try sign in!',
        });
      }

      res.json({ success: false, message: 'Internal server error!' });
    }
  } else {
    res.json({ success: false, message: 'unauthorized access!' });
  }
};

// const isAuth = async (req, res, next) => {
//   if (req.headers && req.headers.authorization) {
//     const token = req.headers.authorization.split(' ')[1];

//     try {
//       const decode = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await User.findById(decode.userId);
//       if (!user) {
//         return res.json({ success: false, message: 'unauthorized access!' });
//       }

//       req.user = user;
//       next();
//     } catch (error) {
//       if (error.name === 'JsonWebTokenError') {
//         return res.json({ success: false, message: 'unauthorized access!' });
//       }
//       if (error.name === 'TokenExpiredError') {
//         return res.json({
//           success: false,
//           message: 'session expired try sign in!',
//         });
//       }

//       res.json({ success: false, message: 'Internal server error!' });
//     }
//   } else {
//     res.json({ success: false, message: 'unauthorized access!' });
//   }
// };

module.exports = isAuth;


module.exports = {
	requireToken,
	createUserToken,
	handleValidateOwnership,
	handleUserValidateOwnership, 
	isAuth
};
