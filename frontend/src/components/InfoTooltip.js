import React from "react";
import { usePopupClose } from "./hooks/usePopupClose";
import resOkImmage from "../images/resOk.svg";
import resNotOkImmage from "../images/resNotOk.svg";

function InfoTooltip(props) {

  usePopupClose(props.isOpen, props.onClose)

  return (

    <div className={props.isOpen ? ("popup popup_opened") : ("popup")}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={props.onClose}></button>
        <div style={{
          backgroundImage: props.res ? (`url(${resOkImmage})`) : (`url(${resNotOkImmage})`),
          height: 120,
          width: 120,
          margin: '60px auto 32px',
        }}/>
        {props.isOpen === 'register' && <h2 className="popup__form-name" style={{
          textAlign: "center",
          fontWeight: 900,
          fontSize: 24,
          margin: '0 auto 60px'
        }}>{props.res ? ('Вы успешно зарегистрировались!') : ('Что-то пошло не так! Попробуйте еще раз.')}</h2>}
        {props.isOpen === 'login' && <h2 className="popup__form-name" style={{
          textAlign: "center",
          fontWeight: 900,
          fontSize: 24,
          margin: '0 auto 60px'
        }}>{props.res ? ('Вы успешно вошли!') : ('Что-то пошло не так! Попробуйте еще раз.')}</h2>}
      </div>
    </div>

  )


}

export default InfoTooltip;