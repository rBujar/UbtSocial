import "./navbar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from "react-router-dom";


const navbar = () => {
  return (
    <div>
      <div className="navbar">
        <div className="left">
          <Link to="/" style={{textDecoration: "none"}}>
          <span>Ubt Social</span>
          </Link>
          <HomeOutlinedIcon/>
          <DarkModeOutlinedIcon/>
          <GridViewOutlinedIcon/>
          <div className="search">
            <SearchOutlinedIcon/>
            <input type="text" placeholder="Search"/>
          </div>
          </div> 
        <div className="right">
          <PersonOutlineOutlinedIcon/>
          <EmailOutlinedIcon/>
          <NotificationsOutlinedIcon/>
          <div className="user">
            <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
            <span>John Doe</span>
          </div>
        </div>
        </div>
    </div>
  )
}

export default navbar
