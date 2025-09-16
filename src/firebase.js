
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth,signInWithEmailAndPassword,signOut} from 'firebase/auth'
import { addDoc,collection,getFirestore } from "firebase/firestore";

import {toast} from "react-toastify"
const firebaseConfig = {
  apiKey: "AIzaSyDjwaTNkG9U_i_-TCS0L3-rUEtCxbtRoug",
  authDomain: "netflix-clone-30447.firebaseapp.com",
  projectId: "netflix-clone-30447",
  storageBucket: "netflix-clone-30447.firebasestorage.app",
  messagingSenderId: "769062310030",
  appId: "1:769062310030:web:8108e7c3320276aafc39df"
};

 
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore()

const signup = async (name, email, password) => {
  try {
   
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

   
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  
 
  }
};




const login=async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password)


    }catch(error){
        console.log(error);
         toast.error(error.code.split('/')[1].split('-').join(" "))

    }

}

const logout=()=>{
    signOut(auth)
}
export {auth,db,login,signup,logout}