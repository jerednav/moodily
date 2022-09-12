import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <Wrapper>
      <div class="nav-center">
        <button
          type="button"
          class="toggle-btn"
          onClick={() => console.log("toggle sidebar")}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 class="logo-text">dashboard</h3>
        </div>
        <div class="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => console.log("show/hide dropdown")}
          >
            <FaUserCircle />
            jered
            <FaCaretDown />
          </button>
          <div class="dropdown show-dropdown">
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => console.log("logout")}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
