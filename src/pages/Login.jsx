import { BsFillImageFill } from 'react-icons/bs' 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {useNavigate, Link} from "react-router-dom"; 
import { useState  } from 'react';
 
export default function Login() {
  
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer container">
      <div className="formWrapper">
        <h2 className="logo">Dream Chat</h2>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email"></input>
          <input type="password" placeholder="password"></input>
          <button>Sign In</button>
          {err && <span className="signupError">Something went wrong</span>}
          <p>You don't have an account? <Link to = "/register">Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
}

