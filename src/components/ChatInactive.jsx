import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useState, useLayoutEffect } from "react";

export default function ChatInactive({
  startMessaging,
  showSidebar,
  setShowSidebar
}) {

  const openSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div
      className="chatInactive"
      style={{ display: startMessaging === false ? "block" : "none" }}
    >
      {showSidebar === false && (
        <div className="chatInfo">
          {/* <div className="userInfo">
            <AiOutlineArrowLeft />
          </div> */}
          <div className="userSearch" onClick={openSidebar}>
            <p>search user</p>
            <AiFillCaretDown />
          </div>
        </div>
      )}

      {showSidebar === true && (
        <div className="chatInfo">
          {/* <div className="userInfo">
            <AiOutlineArrowLeft />
          </div> */}
          <div className="userSearch" onClick={openSidebar}>
            <p>close search</p>
            <AiFillCaretUp />
          </div>
        </div>
      )}

      <div className="beginChat">
        <div className="callToAction">
          <p>select a chat to start messaging</p>
        </div>
      </div>
    </div>
  );
}
