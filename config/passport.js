const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const UserModel = require("../models/user");
console.log(process.env.GOOGLE_CLIENT_ID)


// configuring Passport!
passport.use(
  new GoogleStrategy(
    {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
  let userDocument = await UserModel.findOne({ googleId: profile.id });
  if (userDocument) return cb(null, userDocument);
  try {
    userDocument = await UserModel.create({
      name: profile.displayName,
      googleId: profile.id,
      email: profile.emails[0].value
    });
    return cb(null, userDocument);
  } catch (err) {
    return cb(err);
  }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
// passport.serializeUser(function(user, cb) {
//   cb(null, user._id);
// });

 
  passport.deserializeUser(function(userId, cb) {
    UserModel.findById(userId).then(function(user){
      cb(null, user);
    })
  })

// passport.deserializeUser(async function(userId, cb) {
//   const ser = await UserModel.findById(userId);
//   });


  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user
