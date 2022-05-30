import { db } from "../firebase";
import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { FiSend } from "react-icons/fi";
import { useParams } from "react-router-dom";
export default function ChatBox() {
  const [sendMessages, setSendMessages] = useState("");
  const [messages, setMessages] = useState([]);
  const params = useParams();

  useEffect(() => {
    db.collection(params.params)
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, [params]);

  async function sentMessages(e) {
    e.preventDefault();

    const access_token = localStorage.getItem("access_token");
    const name = localStorage.getItem("name");
    const profilePict = localStorage.getItem("profilePict");

    await db.collection(params.params).add({
      name,
      access_token,
      text: sendMessages,
      photoURL: profilePict,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setSendMessages("");
  }
  return (
    <>
      <div className="flex-1 flex flex-col justify-between shadow">
        <div className="bg-gray-100 h-14 flex flex-row py-1 justify-center items-center">
          <img src={require("../assets/logo1.png")} className="w-36"></img>
          <p className="font-bold mt-1 ml-2 text-emerald-700">Chat App</p>
        </div>
        <div className="flex-1 overflow-auto p-2">
          <div className="msgs">
            {messages.map(({ name, text, photoURL, createdAt }) => (
              <div className="flex flex-row justify-start items-center mb-3 border-b pb-2">
                <img
                  className="rounded-full w-14 h-14 object-cover mr-3"
                  src={photoURL}
                  alt=""
                />
                <div className="flex flex-col text-left">
                  <p className="font-bold">{name}</p>
                  <p className="text-left">{text} </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={sentMessages}>
          <div className="bg-gray-100 h-14 flex flex-row p-2">
            <input
              type="text"
              className="rounded-lg flex-1 border shadow px-3"
              value={sendMessages}
              onChange={(e) => setSendMessages(e.target.value)}
            ></input>
            <button className="mx-3 bg-emerald-600 px-3 rounded-full text-white hover:bg-emerald-800">
              <FiSend />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
