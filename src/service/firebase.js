import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

try {
  firebase.initializeApp({
    apiKey: 'AIzaSyDOZ6IN92pX5LbM6jBJJQAkGBDw-3gwjho',
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storage: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  })
}
catch (error) {
  if (!/already exists/u.test.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack)
  }
}

// creates an instance of auth, storage, firestore and ships that out with the short name "fb"
// exporting them as one object

export const fb = {
  auth: firebase.auth(),
  storage: firebase.storage(),
  firestore: firebase.firestore(),
}