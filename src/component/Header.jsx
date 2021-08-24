import React, {useContext} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import  AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';

import {useHistory } from "react-router-dom";
import {AuthContext} from '../contexts/AuthContext';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';

import InstaLogo from '../Resources/InstagramLogo.png';
import "./Header.css";

function Header(props) {
    const useStyles = makeStyles((theme) => ({
        grow: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        inputRoot: {
          color: 'inherit',
        },
        inputInput: {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
          border: '1px solid #636e72',
          color: '#636e72',
          height:'10px',
          borderRadius:'5%'
        },
        sectionDesktop: {
          display: 'none',
          [theme.breakpoints.up('md')]: {
            display: 'flex',
          },
          color:'#636e72',
          marginRight:'15%'
        },
        sectionMobile: {
          display: 'flex',
          [theme.breakpoints.up('md')]: {
            display: 'none',
          },
        },
        appb:{
          backgroundColor:'white'
        },
        navicon:{
          color:'black',
          marginRight:'1%',
          cursor:'pointer'
        },
        navicon2:{
          color:'black',
          cursor:'pointer'
        },
        small: {
          width: theme.spacing(3),
          height: theme.spacing(3),
        },
      
      }));
    const classes = useStyles();
    
    const history = useHistory();
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const { signOut, currentUser } = useContext(AuthContext);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
      };
      const handleProfile=()=>{
      //  console.log(currentUser)
        history.push(`/profile/${currentUser.uid}`)
      }
      const handleLogout=async ()=>{
        await signOut();
        history.push("/login")
      }
    
      const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
      };
      const handleBannerClick= ()=>
      {
        history.push("/")
      }
    
      const menuId = 'primary-search-account-menu';
      const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem className={classes.item} onClick={handleProfile}><AccountCircle /><p>&nbsp;</p>Profile</MenuItem>
          <MenuItem className={classes.item} onClick={handleLogout}><ExitToAppIcon /><p>&nbsp;</p>Logout</MenuItem>
        </Menu>
      );
    
      const mobileMenuId = 'primary-search-account-menu-mobile';
      const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
        
          <MenuItem className={classes.item} onClick={handleProfile}>
          <AccountCircle /><p>&nbsp;</p> <p>Profile</p>
          </MenuItem>
          <MenuItem className={classes.item} onClick={handleLogout}><ExitToAppIcon /><p>&nbsp;</p> Logout</MenuItem>
        </Menu>
      );
    
    return (
        <div className = {classes.grow}>
            <AppBar className={classes.appb} position="fixed">
                <ToolBar>
                <div className="insta-head2">
                    <img src={InstaLogo} alt="Insta-logo" onClick={handleBannerClick} style={{cursor: 'pointer'}}/>
                </div>
                    <div className={classes.grow}></div>
                    <HomeIcon onClick={handleBannerClick} className={classes.navicon}/>
                    {/* <ExploreOutlinedIcon onClick={handleNavigation} className={classes.navicon2}></ExploreOutlinedIcon> */}
                    <div className={classes.sectionDesktop}>
                        <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        >
                        <Avatar src={props?.userData?.photoURL} className={classes.small} ></Avatar>
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        >
                        <MoreIcon/>
                        </IconButton>
                    </div>
                </ToolBar>
            </AppBar>
            {renderMenu}
            {renderMobileMenu}
        </div>
    )
}

export default Header
