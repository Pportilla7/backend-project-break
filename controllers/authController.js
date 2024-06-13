const { auth, signInWithEmailAndPassword } = require('../config/firebase');

async function authUsuario(req, res) {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        res.redirect('/dashboard');
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error: ${errorCode}, Message: ${errorMessage}`);
        res.status(401).send('Authentication failed');
    }
}

module.exports = { authUsuario };
