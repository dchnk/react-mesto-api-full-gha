import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );;

  function onDelete() {
    props.onCardDelete(props.card)
  }

  function onClick() {
    props.onCardClick(props.card)
  }

  function onLike() {
    props.onCardLike(props.card)
  }

  return (

    <article className="element">
      <div className="element__photo" onClick={onClick} style={{
        backgroundImage: `url(${props.card.link})`,
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `center center`
      }} />
      {isOwn && <button className="element__bin" onClick={onDelete}></button>}
      <div className="element__info">
        <h2 className="element__heading">{props.card.name}</h2>
        <div className="element__like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={onLike}></button>
          <p className="element__current-likes">{props.card.likes.length}</p>
        </div>
      </div>
    </article>

  )
}

export default Card;