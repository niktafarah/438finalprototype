// Import the functions you need from the SDKs you need
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

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGFg3wIM0OJZlTFxtnQyUGuqxsJdm7O-Q",
  authDomain: "example-db-2f091.firebaseapp.com",
  projectId: "example-db-2f091",
  storageBucket: "example-db-2f091.appspot.com",
  messagingSenderId: "291425588075",
  appId: "1:291425588075:web:c130d6b1eecdb91edcb22e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let messages = [];
const messagesRef = collection(db, "messages");

async function sendMessage(message) {
  console.log("Sending a message!");
  // Add some data to the messages collection
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      time: Date.now(),
      content: message,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function handleInput(e) {
  if (e.key == "Enter") {
    sendMessage(e.target.value);
    e.target.value = "";
  }
}

function view() {
  return html`<h1>my cool app</h1>
    <input type="text" @keydown=${handleInput} />
    <div id="messages-container">
      ${messages.map((msg) => html`<div class="message">${msg.content}</div>`)}
    </div>`;
}

render(view(), document.body);

async function getAllMessages() {
  messages = [];

  const querySnapshot = await getDocs(
    query(messagesRef, orderBy("time", "desc"))
  );
  querySnapshot.forEach((doc) => {
    let msgData = doc.data();
    messages.push(msgData);
  });

  console.log(messages);
  render(view(), document.body);
}

getAllMessages();

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