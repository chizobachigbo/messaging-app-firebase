import { useState, useContext } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { HiOutlineMenu } from "react-icons/hi";

export default function Search({ setShowNavbar, setStartMessaging }) {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const beginMessage = () => {
    setStartMessaging(true);
  };

  const openNavbar = () => {
    setShowNavbar(true);
  };

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };


  return (
    <div className="search">
      <div className="searchForm">
        <div className="hamburgerNav" onClick={openNavbar}>
          <HiOutlineMenu />
        </div>
        <input
          type="text"
          placeholder="search for user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
          value={username}
        />
      </div>
      {err && <span>User not found</span>}
      <div onClick={beginMessage}>
        {user && (
          <div className="userChat" onClick={handleSelect}>
            <img src={user.photoURL} alt="" />
            <div className="userChatInfo">
              <p className="userName">{user.displayName}</p>
              {/* <p>Hello</p> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
