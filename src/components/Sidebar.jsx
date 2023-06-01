import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

export default function Sidebar({
  setStartMessaging,
  showNavbar,
  setShowNavbar,
}) {

  return (
    <div
      className="sidebar"
    >
      <Navbar showNavbar={showNavbar} setShowNavbar={setShowNavbar}/>
      <Search
        showNavbar={setShowNavbar}
        setShowNavbar={setShowNavbar}
        setStartMessaging={setStartMessaging}
      />
      <Chats setStartMessaging={setStartMessaging}/>
    </div>
  );
}
