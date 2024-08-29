const { initializeApp } = require('firebase/app');
const {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  verifyPasswordResetCode,
  signInWithPhoneNumber,
  updateProfile,
} = require('firebase/auth');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'bitebuddy-fd181.firebaseapp.com',
  projectId: 'bitebuddy-fd181',
  storageBucket: 'bitebuddy-fd181.appspot.com',
  messagingSenderId: '523055711783',
  appId: '1:523055711783:web:f7b1dd4e3b29609a43b002',
  measurementId: 'G-EP2LXETK3P',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function AuthFunc() {
  this.signup = (email, password, name, image) => {
    let data = createUserWithEmailAndPassword(auth, email, password);
    return data;
  };

  this.activeUser = () => {
    return auth.currentUser;
  };

  this.login = (email, password) => {
    let data = signInWithEmailAndPassword(auth, email, password);
    return data;
  };
  this.signout = () => {
    let data = signOut(auth);
    return data;
  };
  this.reset = (email) => {
    const res = sendPasswordResetEmail(auth, email);
    return res;
  };
  this.phone = (number, otp) => {
    const res = signInWithPhoneNumber(auth, number, otp);
    return res;
  };
  this.profile = (name, image) => {
    const res = updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
    return res;
  };

  this.verifyemail = (email) => {
    const res = sendEmailVerification(auth, email);
    return res;
  };

  this.verifycode = (code) => {
    const res = verifyPasswordResetCode(auth, code);
    return res;
  };

  this.confirmreset = (code, newpassword) => {
    const res = confirmPasswordReset(auth, code, newpassword);
    return res;
  };
  this.changeEmail = (email, curruser) => {
    const data = updateEmail(curruser, email);
    return data;
  };
  this.changePassword = (password, curruser) => {
    const data = updatePassword(curruser, password);
    return data;
  };
}
const authenticate = new AuthFunc();

module.exports = authenticate;
