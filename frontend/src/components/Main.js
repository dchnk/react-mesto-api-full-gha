import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);


    return (
        <main className="main">
            <section className="profile">
                <button className="profile__avatar-container" onClick={props.onEditAvatar} style={{
                    backgroundImage: `url(${currentUser.avatar})`,
                    backgroundSize: `cover`,
                    backgroundRepeat: `no-repeat`,
                    backgroundPosition: `center center`
                }} />
                <div className="profile__info">
                    <h1 className="profile__heading">{currentUser.name}</h1>
                    <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button className="profile__add" type="button" onClick={props.onAddCard}></button>
            </section>
            <section className="elements">
                {props.cards.map((card) => (
                    <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                ))}
            </section>
        </main>
    )
}

export default Main;