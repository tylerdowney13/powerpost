import "./topbar.css";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Chat } from "@material-ui/icons";
import DropDownMenu from "../dropdownmenu/DropDownMenu";

export default function Topbar() {
  const { user } = useContext(AuthContext)

  
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration: "none"}} className="topbarLink">
          <span className="logo">POWERPOST</span>
        </Link>
        <DropDownMenu />
      </div>
      <div className="topbarRight">
        <div className="topbarUserInfoContainer">
            <div className="topbarUsername">{user.username}</div>
            <img src={ user.profilePicture ? user.profilePicture : "https://i1.wp.com/immersivelrn.org/wp-content/uploads/no_avatar.jpg?fit=250%2C250&ssl=1"} alt="" className="topbarImg"/>
          <Link to="/messenger">
              <Chat className="topbarLink" />
          </Link>
        </div>
      </div>
    </div>
  );
}