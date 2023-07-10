import React from "react";
import { usePopupClose } from "./hooks/usePopupClose";

function ImagePopup(props) {

  usePopupClose(props.card.link, props.onClose)

  const [currentCard, setCurrentCard] = React.useState(props.card)

  React.useEffect(() => {
    if (!Object.keys(props.card).length) {
      return;
    }
    setCurrentCard(props.card);


  }, [props.card])

  return (

    <div className={props.card?.name ? ("popup popup_type_fullscreen popup_opened") : ("popup popup_type_fullscreen")}>
      <div className="popup__container popup__container_type_fullscreen">
        <button type="button" className="popup__close" onClick={props.onClose}></button>
        <img className="popup__image" alt={currentCard.name} src={currentCard.link} />
        <h2 className="popup__image-name">{currentCard.name}</h2>
      </div>
    </div>

  )


}

export default ImagePopup;