import { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import {useNavigate, Link} from "react-router-dom"; 

export default function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value.toLowerCase();
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
            
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });


    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer container">
      <div className="formWrapper">
        <h2 className="logo">Dream Chat</h2>
        <span className="title">Sign Up</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="displayName"></input>
          <input type="email" placeholder="email"></input>
          <input type="password" placeholder="password"></input>
          <input type="file" id="file" style={{ display: "none" }}></input>
          <label htmlFor="file">
            <BsFillImageFill />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
          {err && <span className="signupError">Something went wrong</span>}
          <p>Do you have an account? <Link to= "/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
}
