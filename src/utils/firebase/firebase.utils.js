import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged, reauthenticateWithCredential} from "firebase/auth"

import {getFirestore,doc,setDoc,getDoc,collection,writeBatch,query,getDocs} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC4eiflOKKeoyzQwGSRNhJcHuZrY4N1k7o",
  authDomain: "my-clothing-db-2e33e.firebaseapp.com",
  projectId: "my-clothing-db-2e33e",
  storageBucket: "my-clothing-db-2e33e.appspot.com",
  messagingSenderId: "1035120397201",
  appId: "1:1035120397201:web:5e0bd0528d05abff996830"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const addCollectionDocuments = async (collectionKey,objectstoAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectstoAdd.forEach(element => {
    const docRef = doc(collectionRef,element.title.toLowerCase());
    batch.set(docRef,element);
  });
  await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db,"categories");

  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map(docSnapShot=>docSnapShot.data());
}

export const createUserDocumentFromAuth = async (userAuth) => {
  if(!userAuth)return;

  const userDocRef = doc(db,"users",userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt
      });
    } catch (error) {
    }
  }
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async(email,password) =>{
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthUserWithEmailAndPassword = async (email,password) =>{
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async() => await signOut(auth);

export const onAuthChangeHandler = (callback) => onAuthStateChanged(auth,callback)