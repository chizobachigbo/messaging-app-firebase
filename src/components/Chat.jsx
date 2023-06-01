import { AiFillCamera } from "react-icons/ai";
import { RiUserAddFill } from "react-icons/ri";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export default function Chat({ startMessaging, showSidebar, setShowSidebar }) {
  const { data } = useContext(ChatContext);

  const openSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div
      className="chat"
      style={{ display: startMessaging === true ? "block" : "none" }}
    >
      <div className="chatInfo">
        <div className="userInfo">
          <AiOutlineArrowLeft />
          <img src={data.user?.photoURL} alt="" />
          <span className="userName">{data.user?.displayName}</span>
        </div>

        {showSidebar === false && (
          <div className="userSearch" onClick={openSidebar}>
            <p>search user</p>
            <AiFillCaretDown />
          </div>
        )}

        {showSidebar === true && (
          <div className="userSearch" onClick={openSidebar}>
            <p>close search</p>
            <AiFillCaretUp />
          </div>
        )}

        <div className="chatIcons">
          <AiFillCamera />
          <RiUserAddFill />
          <FiMoreHorizontal></FiMoreHorizontal>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}
