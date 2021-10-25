import { getFirestore } from 'firebase/firestore';
import { addDoc, collection, getDocs, query, updateDoc, doc, where, deleteDoc/*getDoc, deleteDoc*/ } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../config-firebase';

initializeApp(firebaseConfig);

const database = getFirestore();
const auth = getAuth();
const authProvider = new GoogleAuthProvider();

export let usuario;

export const guardarDatabase = async (nombreColeccion, data) => {

  try {
    const respuesta = await addDoc(collection(database, nombreColeccion), data)
    return respuesta;
  } catch (e) {
    return false;
  }

}
  
// getAll()
export const consultarDatabase = async (nombreDatabase) => {
  try {
    const response = await getDocs(query(collection(database, nombreDatabase)));
    const elementos = response.docs.map((doc) => {
      const document = {
        dbid: doc.id,
        ...doc.data(),
      };
      return document;
    });
    console.log('De la DDBB  ',`${nombreDatabase}`,'  ~~',elementos);
    return elementos;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const actualizarDocumentoDatabase = async (nombreDatabase, id, data) => {
    try {
        const response = await updateDoc(doc(database, nombreDatabase, id), data);
        console.log(response);
    } catch (error) {
        throw new Error(error.message);
    }
};

//take an element from the database where field = value query
export const consultarDatabaseWhere = async (nombreDatabase, field, value) => {
  try {
    const response = await getDocs(query(collection(database, nombreDatabase), where(`${field}`, '==', `${value}`)));
    console.log('response de query  ~~',response);
    const elementos = response.docs.map((doc) => {
      const document = {
        dbid: doc.id,
        ...doc.data(),
      };
      return document;
    });
    console.log(elementos);
    return elementos;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Eliminacion de un documento
export const eliminarDocumentoDatabase = async (nombreColeccion, id) => {
  try {
    const respuesta = await deleteDoc(doc(database, nombreColeccion, id))
    console.log(respuesta);
  } catch (e) {
    throw new Error(e)
  }
}

// CrearUsuarios
export const crearUsuario = async (email, password) => {
  try {
    const credencialesUsuario = await createUserWithEmailAndPassword(auth, email, password)
    console.log(credencialesUsuario);
    console.log(credencialesUsuario.user);
    console.log(credencialesUsuario.user.uid);
    const user = {
      id: credencialesUsuario.user.uid,
      email: credencialesUsuario.user.email
    }
    guardarDatabase('listaUsuarios', user)
    return user
  } catch (e) {
    throw new Error(e)
  }
}

// Login Usuarios
export const loginUsuario = async (email, password) => {
  try {
    const credencialesUsuario = await signInWithEmailAndPassword(auth, email, password)
    const user = {
      id: credencialesUsuario.user.uid,
      email: credencialesUsuario.user.email
    }
    return user
  } catch (e) {
    // throw new Error(e)
    throw new Error(e.code)
  }
}

export const loginGoogle = async () => {
  try {
    const userCredentials = await signInWithPopup(authProvider);
    const user = {
      id: userCredentials.user.uid,
      email: userCredentials.user.email
    }
    return user
  } catch (e) {
    throw new Error(e);
  }
}

// LogOut -> salir
export const logOutUsuario = () => {
  const respuesta = signOut(auth)
  console.log(respuesta);
  console.log('Me sali...!');
}

//  datos usuario
export const datosUsuario = () => {
  const user = auth.currentUser
  console.log(user);

  if (user) {
    console.log(user);
    return user
  } else {
    console.log('datos usuario:', user);
    return undefined
  }
}


// el.addEventListener('click', function)
// Usuario Activo
onAuthStateChanged(auth, (user) => {

  if (user) {
    usuario = user
    console.log('El usuario logueado');
  } else {
    console.log('No hay usuario logeado');
    usuario = undefined
  }

})