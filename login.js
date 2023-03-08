// import { initializeApp } from "firebase/app";
// import {
//     getFirestore,
//     collection,
//     addDoc,
//     getDocs,
//     onSnapshot,
//     query,
//     orderBy,
//   } from "firebase/firestore";
//   import { html, render } from "lit-html";


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBg1oSkWWo2JFvS3rnRhCKiinhsI8JOst8",
//   authDomain: "final-prototype-682b9.firebaseapp.com",
//   projectId: "final-prototype-682b9",
//   storageBucket: "final-prototype-682b9.appspot.com",
//   messagingSenderId: "378274101314",
//   appId: "1:378274101314:web:586fba5e0fc27e842dd5db"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// let messages = [];
// const messagesRef = collection(db, "messages");

// async function sendMessage(message) {
//   console.log("Sending a message!");

//   // Add some data to the messages collection
//   try {
//     const docRef = await addDoc(collection(db, "messages"), {
//         username: message,
//         time: Date.now(),
//         score: finalScore,
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

// function handleInput(e) {
//   if (e.key == "Enter") {
//     sendMessage(e.target.value);
//     e.target.value = "";
//   }
// }


// function view() {
//     return html`<h1>Mooshball</h1>
//       Username:
//       <input type="text" @keydown=${handleInput} />
//       <br>High Score: ${finalScore}
//       <div id="messages-container">
//         ${messages.map((msg) => html`<div class="message">${msg.content}</div>`)}
//       </div>`;
  
//   }
  
//   render(view(), document.body);
  
//   async function getAllMessages() {
//     messages = [];
  
//     const querySnapshot = await getDocs(
//       query(messagesRef, orderBy("time", "desc"))
//     );
//     querySnapshot.forEach((doc) => {
//       let msgData = doc.data();
//       messages.push(msgData);
//     });
  
//     console.log(messages);
//     render(view(), document.body);
//   }
  
//   getAllMessages();
  
//   onSnapshot(
//     collection(db, "messages"),
//     (snapshot) => {
//       console.log("snap", snapshot);
//       getAllMessages();
//     },
//     (error) => {
//       console.error(error);
//     }
//   );
  