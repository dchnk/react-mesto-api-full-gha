import React from "react";
import { Link, useLocation } from "react-router-dom";
import headerLogo from '../images/logo/logo-mesto-white.svg';
import burgerMenu from '../images/Burger.svg';
import closeBurgerMenu from '../images/Close.svg';

function Header(props) {

  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [isBurgerClicked, setIsBurgerClicked] = React.useState(false);
  const isMobile = screenWidth <= 500;
  const location = useLocation();
  
  function handleChangeScreen() {
    setScreenWidth(window.innerWidth)
  }
  
  React.useEffect(() => {
    window.addEventListener('resize', handleChangeScreen)
    return () => {
      window.removeEventListener('resize', handleChangeScreen)
    }
  })

  function handleBurgerClick() {
    setIsBurgerClicked(!isBurgerClicked)
  }

  function handleExitClick() {
    props.onExitClick();
    setIsBurgerClicked(false);
  }
  

  return (
    <header className="header">
      <Link style={{
        maxWidth: 142,
      }} to="/"><img className="header__logo" src={headerLogo} alt="логотип" /></Link> 

      {props.loggedIn && <button type="button" className="haeder__burger-menu" onClick={handleBurgerClick} style={{
        backgroundImage: `url(${isBurgerClicked ? (closeBurgerMenu) : (burgerMenu)})`,
        width: isBurgerClicked ? (20) : (24),
      }}></button>}

      <div className="header__login-container" style={{
        display: (isMobile && !isBurgerClicked && location.pathname !== "/sign-in" && location.pathname !== "/sign-up") ? ('none') : ('flex'),
        margin: isMobile && props.loggedIn && 0,
        paddingBottom: isMobile && props.loggedIn && 40,
        borderBottom: !props.loggedIn && 'none',
        gridArea: props.loggedIn && isMobile && '1 / 1 / 2 / 3'
      }}>
        {props.loggedIn && <p className="header__e-mail" style={{
          fontWeight: 500,
          fontSize: 18,
          color: 'white',
          padding: 0
        }}>{props?.userEmail}</p>}
        {props.loggedIn && <Link to='/sign-in' className="header__link header__link_type_exit" onClick={handleExitClick}>Выйти</Link>}
        {location.pathname === "/sign-in" && !props.loggedIn && <Link to='/sign-up' className="header__link">Регистрация</Link>}
        {location.pathname === "/sign-up" && !props.loggedIn && <Link to='/sign-in' className="header__link">Войти</Link>}
      </div>
    </header>
  )
}

export default Header;
