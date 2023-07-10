import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { usePopupClose } from "./hooks/usePopupClose";

function EditProfilePopup(props) {

    usePopupClose(props.isOpen, props.onClose)

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });


    }

    return (
        <PopupWithForm
            name='edit'
            title='Редактировать профиль'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
        >
            <input className="popup__input popup__input_type_name" onChange={handleChangeName} value={name ? name : ''} type="text" placeholder="Имя" name="name" id="popup-input-name" required minLength="2" maxLength="40" />
            <span className="popup__input-error popup-input-name-error">Вы пропустили это поле.</span>
            <input className="popup__input popup__input_type_job" onChange={handleChangeDescription} value={description ? description : ''} type="text" placeholder="О себе" name="about" id="popup-input-job" required minLength="2" maxLength="200" />
            <span className="popup__input-error popup-input-job-error">Вы пропустили это поле.</span>
        </PopupWithForm>
    )


}

export default EditProfilePopup;