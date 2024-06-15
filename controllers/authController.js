const { auth, signInWithEmailAndPassword } = require('../config/firebase');

async function authUsuario(req, res, next) {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        req.session.user = userCredential.user; 
        console.log(req.session.user)
        next(); 
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error: ${errorCode}, Message: ${errorMessage}`);
        res.status(401).send('Authentication failed');
    }
}

function checkAuth(req, res, next) {
    console.log(req.session.user, 'esto es dentro del checkAuth');
    if (req.session.user) {
        console.log('Hay una session ya')
        next();
    } else {
      res.redirect('/login'); 
    }
}

function logOut(req, res){
    req.session.destroy((error)=>{
        if(error){
            console.error(`Error: ${errorCode}, Message: ${errorMessage}`);
        }else{
            res.redirect('/products');
        }
    })
}

module.exports = { authUsuario, checkAuth, logOut };
