const firebase = require('firebase/app')
import { getAnalytics } from "firebase/analytics";
require('firebase/firestore')
require('firebase/auth')
// require('firebase/analytics')

// const isClientSide = require('../isClientSide')

const firebaseConfig = {
  apiKey: "AIzaSyBP0kJ4UrK9WOWiIKnklfoFSlD8_zz4tRs",
  authDomain: "milkount-83128.firebaseapp.com",
  projectId: "milkount-83128",
  storageBucket: "milkount-83128.appspot.com",
  messagingSenderId: "594438511262",
  appId: "1:594438511262:web:2d0c3345dbd4a25808798f",
  measurementId: "G-TSEZ1Z1GR3"
};

// Initialize Firebase
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
const firebaseDB = firebaseApp.firestore()
const analytics = getAnalytics(app);
// if (isClientSide()) firebase.analytics()

// Helpers
const docWithId = (doc) => ({ id: doc.id, ...doc.data() })

const getDocumentItem = async (docRef) => docWithId(await docRef.get())

const getCollectionItems = async (collectionRef) => {
  const collectionSnapshots = await collectionRef.get()
  const snapshots = []
  collectionSnapshots.forEach((snapshot) => {
    snapshots.push(docWithId(snapshot))
  })
  return snapshots
}

// To avoid “cannot be serialized as JSON” error
const convertDates = (doc) => ({
  ...doc,
  dateCreated: doc.dateCreated ? doc.dateCreated.toDate().toString() : null,
  dateUpdated: doc.dateUpdated ? doc.dateUpdated.toDate().toString() : null
})

module.exports = {
  firebase,
  firebaseApp,
  firebaseDB,
  analytics,

  docWithId,
  getDocumentItem,
  getCollectionItems,

  convertDates
}
