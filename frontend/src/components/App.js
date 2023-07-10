import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import api from "../utils/Api.js";
import InfoTooltip from "./InfoTooltip.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { Login } from "./Login.js";
import { Register } from "./Register.js";
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import * as mestoAuth from '../utils/mestoAuth.js';
import { ProtectedRoute } from './ProtectedRoute.js'

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [userEmail, setUserEmail] = React.useState(null);
  const [res, setRes] = React.useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link || isInfoTooltipOpen

  const navigate = useNavigate();
  const location = useLocation();  

  const checkToken = () => {
    const token = localStorage.getItem('jwt');
    token && mestoAuth.checkToken(token)
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          setUserEmail(data.email);
          navigate(location.pathname)
        } else {
          setLoggedIn(false);
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  React.useEffect(() => {
    checkToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    loggedIn && api.takeProfileInfoRequest(token)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => showError(err));
  }, [loggedIn])

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    loggedIn && api.takeCardsRequset(token)
      .then((cardList) => {
        setCards(cardList);
      })
      .catch(err => showError(err));
  }, [loggedIn])

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function showError(err) {
    return console.error(err);
  }

  function handleCardDelete(card) {

    const token = localStorage.getItem('jwt');

    api.deleteItemRequest(card._id, token)
      .then(() => {
        setCards((state) => state.filter(item => item._id !== card._id));
      })
      .catch(err => showError(err));
  }

  function handleCardLike(card) {
    const token = localStorage.getItem('jwt');
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.switchLikeStatusRequest(card._id, isLiked, token)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => showError(err));
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleUpdateUser(profileInfo) {
    const token = localStorage.getItem('jwt');
    setIsLoading(true);
    api.editUserInfoRequet(profileInfo, token)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => showError(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(profileInfo) {
    const token = localStorage.getItem('jwt');
    setIsLoading(true);
    api.updateProfileInfoRequest(profileInfo, token)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => showError(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddNewCard(cardInfo) {
    const token = localStorage.getItem('jwt');
    setIsLoading(true);
    api.postNewCardRequest(cardInfo, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => showError(err))
      .finally(() => setIsLoading(false));
  }

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddCardClick() {
    setisAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false)
    setisEditProfilePopupOpen(false)
    setisAddPlacePopupOpen(false)
    setIsInfoTooltipOpen(false)
    setSelectedCard({})
  }

  function handleRegisterSubmit(password, email) {
    mestoAuth.register(password, email)
      .then(() => {
        setIsInfoTooltipOpen('register');
        setRes(true)
        navigate('/sign-in')
      })
      .catch((e) => {
        setIsInfoTooltipOpen('register');
        setRes(false)
        console.log(e)
      })

  }

  function handleLoginSubmit(password, email) {
    mestoAuth.authorize(password, email)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setUserEmail(email)
        setIsInfoTooltipOpen('login');
        setRes(true)
        setLoggedIn(true);
        navigate('/')
      })
      .catch((e) => {
        setIsInfoTooltipOpen('login');
        setLoggedIn(false);
        setRes(false)
        console.log(e)
      })

  }

  function handleExitClick() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header loggedIn={loggedIn} userEmail={userEmail} onExitClick={handleExitClick} />
          <Routes>
            <Route path="/sign-in" element={<Login onSubmit={handleLoginSubmit} />} />
            <Route path="/sign-up" element={<Register onSubmit={handleRegisterSubmit} />} />
            <Route path="/" element={<ProtectedRoute element={Main}
              onEditProfile={handleEditProfileClick}
              onAddCard={handleAddCardClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              loggedIn={loggedIn} />
            } />
            <Route path="/404-page-not-found" element={
              <h2 style={{
                color: "white",
                textAlign: "center",
                maxWidth: 350,
                margin: "auto"
              }}>Упс, кажись, это код 404 - страница не найдена!</h2>
            } />
            <Route path="*" element={loggedIn ?
              <Navigate to="/404-page-not-found" replace />
              : <Navigate to="/sign-in" replace />
            } />
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddNewCard}
            isLoading={isLoading}
          />
          <PopupWithForm
            name='delete'
            title='Вы уверены?'
            buttonText='Да'
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
          <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipOpen} res={res} />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )

}
export default App;
