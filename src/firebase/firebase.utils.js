import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC3IvHc8g4dtgaRPyfJudlIQVrz_WBDwLg",
    authDomain: "tienda-react-41bd9.firebaseapp.com",
    projectId: "tienda-react-41bd9",
    storageBucket: "tienda-react-41bd9.appspot.com",
    messagingSenderId: "398259942634",
    appId: "1:398259942634:web:45459987a7495f26d85393"
};

firebase.initializeApp(config);

//CREO REGISTRO DEL USER EN FIRESTORE
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;