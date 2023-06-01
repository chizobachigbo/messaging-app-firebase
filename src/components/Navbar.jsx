import { RiContactsFill } from "react-icons/ri";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";
import { BsSunFill } from "react-icons/bs";
import { BsToggle2Off } from "react-icons/bs";
import { BsToggle2On } from "react-icons/bs";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext, useState, useEffect } from "react";

export default function Navbar({ showNavbar, setShowNavbar }) {
  const closeNavbar = () => {
    setShowNavbar(false);
  };

  const { currentUser } = useContext(AuthContext);

  const [settings, setSettings] = useState({
    "--primary-color": "#075e54",
    "--secondary-color": "#25d366",
    "--accent-color": "#41b4ee",
    "--background-color": "#ffffff",
    "--chat-background-color": "#ebe4dc",
    "--chat-bubble-color": "#dbfac6",
    "--neutral-color": "#eaeaea",
    "--mid-neutral-color": "#b8b8b8",
    "--dark-neutral-color": "#a4a4a4",
    "--text-color-light": "#ffffff",
    "--text-color-dark": "#525252",
    "--gradient-color": " #fff4d6, #ffe9ad, #b3d678, #8fe17a, #c6f0bc",
  });

  const [theme, setTheme] = useState("light");
  const themes = [
    {
      "--primary-color": "#075e54",
      "--secondary-color": "#25d366",
      "--accent-color": "#41b4ee",
      "--background-color": "#ffffff",
      "--chat-background-color": "#ebe4dc",
      "--chat-bubble-color": "#dbfac6",
      "--neutral-color": "#eaeaea",
      "--mid-neutral-color": "#b8b8b8",
      "--dark-neutral-color": "#a4a4a4",
      "--text-color-light": "#ffffff",
      "--text-color-dark": "#525252",
      "--gradient-color": " #fff4d6, #ffe9ad, #b3d678, #8fe17a, #c6f0bc",
      "--input-text-color": "#525252",
      "--input-color": "#fffff",
    },

    {
      "--primary-color": "#fffff",
      "--secondary-color": "#1da1f2",
      "--accent-color": "#1DA1F2",
      "--background-color": "#15202b",
      "--chat-background-color": "#8899a6",
      "--chat-bubble-color": "#c1eeff",
      "--neutral-color": "#223036",
      "--mid-neutral-color": "#e8f8ff",
      "--dark-neutral-color": "#5f6e74",
      "--text-color-light": "#242526",
      "--text-color-dark": "#ffffff",
      "--gradient-color": " #DDFFD9, ##8899A6, #264653",
      "--input-text-color": "#525252",
      "--input-color": "#c1eeff",
    },
  ];

  function changeTheme(i) {
    const _theme = { ...themes[i] };
    setTheme(i === 0 ? "light" : "dark");
    // update setting
    let _settings = { ...settings };
    for (let key in _theme) {
      _settings[key] = _theme[key];
    }
    setSettings(_settings);
    console.log(settings);
  }

  useEffect(() => {
    const root = document.documentElement;
    for (let key in settings) {
      root.style.setProperty(key, settings[key]);
    }
    // localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <div
      className="navbar"
      style={{ display: showNavbar === true ? "flex" : "none" }}
    >
      <div className="navbar-tab">
        <div className="user">
          <img src={currentUser.photoURL} alt="" />
          <p className="userName">{currentUser.displayName}</p>
        </div>
        <div className="menu-body">
          <div className="userMenuOutline">
            {/* <div className="menu-option contacts">
              <RiContactsFill />
              <p>Contacts</p>
            </div>
            <div className="menu-option calls">
              <BsFillTelephoneFill />
              <p>Calls</p>
            </div>
            <div className="menu-option messages">
              <BsFillBookmarkFill />
              <p>Messages</p>
            </div> */}
            <div className=" themeMode">
              {theme === "light" && (
                <div className="menu-option">
                  <div className="themeModeTitle">
                    <BsFillMoonFill className="darkModeIcon" />
                    <p>Night Mode</p>
                  </div>
                  <div className="lightMode">
                    <BsToggle2Off
                      className="toggleOff light"
                      onClick={() => changeTheme(1)}
                    />
                  </div>
                </div>
              )}
              {theme === "dark" && (
                <div className="menu-option">
                  <div className="themeModeTitle">
                    <BsSunFill className="lightModeIcon" />
                    <p>Light Mode</p>
                  </div>
                  <div className="darkMode">
                  <BsToggle2On
                    className="toggleOn dark"
                    onClick={() => changeTheme(0)}
                  />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="menuFooter">
            <button onClick={() => signOut(auth)}>Logout</button>
            <p>Dream Chat</p>
            <p>Version 1.0</p>
          </div>
        </div>
      </div>
      <div className="navbar-overlay" onClick={closeNavbar}></div>
    </div>
  );
}
