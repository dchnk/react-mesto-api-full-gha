import React from "react";

function PopupWithForm(props) {

return(

<div className={props.isOpen ? (`popup popup_type_${props.name} popup_opened`) : (`popup popup_type_${props.name}`)}>
  <div className="popup__container">
    <button type="button" className="popup__close" onClick={props.onClose}></button>
    <h2 className="popup__form-name">{props.title ? (props.title) : ('')}</h2>
    <form className={`popup__form popup__form_type_${props.name}`} onSubmit={props.onSubmit} name={`popup-form-${props.name}`}>
      {props.children}
      <button className="popup__submit" type="submit">{props.buttonText ? (props.buttonText) : ('Сохранить')}</button>
    </form>
  </div>
</div>

)


}

export default PopupWithForm;
