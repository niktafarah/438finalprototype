import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    onSnapshot,
    query,
    orderBy,
  } from "firebase/firestore";
  import { html, render } from "lit-html";


const firebaseConfig = {
  apiKey: "AIzaSyDtAUq9WF9IJIgqvyKbiGrcpQxoxmCpiKM",
  authDomain: "final438-31e1e.firebaseapp.com",
  projectId: "final438-31e1e",
  storageBucket: "final438-31e1e.appspot.com",
  messagingSenderId: "175908333755",
  appId: "1:175908333755:web:04d54931fa563bb9a9a19e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let messages = [];
const messagesRef = collection(db, "messages");

 async function sendMessage(final) {
    console.log("Sending a message!");
    // Add some data to the messages collection
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        // time: Date.now(),
        scores: final,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // window.sendMessage=sendMessage
  }
  window.sendMessage=sendMessage;


 async function getAllMessages() {
  var messages = [];
  var returnText = [];
  const querySnapshot = await getDocs(
    query(messagesRef, orderBy("scores", "desc")));
  querySnapshot.forEach((doc) => {
    let msgData = doc.data();
    messages.push(msgData);
  });

  // console.log(messages);
  // console.log("testing");
  messages.forEach (entry => {returnText.push(entry.scores)});
  // console.log("returnText" + returnText);
  return returnText;
}
window.getAllMessages=getAllMessages;


onSnapshot(
  collection(db, "messages"),
  (snapshot) => {
    console.log("snap", snapshot);
    getAllMessages();
  },
  (error) => {
    console.error(error);
  }
);

