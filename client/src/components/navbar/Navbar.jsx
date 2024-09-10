
import "./navbar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { Button } from "react-bootstrap";
import { makeRequest } from "../../axios";


const navbar = () => {


  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser} = useContext(AuthContext);

      // console.log(currentUser)


      const handleLogout = async () => {
        try{
          await makeRequest.post("/auth/logout");
          navigate('/login');
        }catch (error){
          console.error("Error logging out: ", error);
        }
      };

      const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span >UbtSocial</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />) :

          (<DarkModeOutlinedIcon onClick={toggle} />

          )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="right">
        <PersonOutlineOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img src={"/upload/"+ currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
        </div>
        <Button className="logout" onClick={handleLogout}> Logout </Button>
      </div>
    </div>
  )
}

export default navbar
