import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import ChatInactive from "../components/ChatInactive";
import { useState, useLayoutEffect } from "react";

export default function Home() {
  const [startMessaging, setStartMessaging] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const [showSidebar, setShowSidebar] = useState(false);
  const [ screenSize, setScreenSize] = useState(0)

  useLayoutEffect(() => {
    const viewSidebar = document.getElementsByClassName("sidebar")[0];
    setScreenSize(window.innerWidth);

    if(screenSize <= 568){
      if (showSidebar === true) {
        viewSidebar.style.display= "block";
       }else{
         viewSidebar.style.display= "none";
       }
    } else{
      viewSidebar.style.display= "block";
    }
  })


  return (
    <div className="home">
      <div className="container">
        <Sidebar
          setStartMessaging={setStartMessaging}
          showNavbar = {showNavbar}
          setShowNavbar = {setShowNavbar}
          showSidebar = {showSidebar}
          setShowSidebar = {setShowSidebar}
        />
        {startMessaging ? (
          <Chat
            startMessaging={startMessaging}
            showSidebar = {showSidebar}
            setShowSidebar = {setShowSidebar}
          />
        ) : (
          <ChatInactive
            startMessaging={startMessaging}
            showSidebar = {showSidebar}
            setShowSidebar = {setShowSidebar}
          />
        )}
      </div>
    </div>
  );
}
