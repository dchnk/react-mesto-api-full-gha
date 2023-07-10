import React from "react";
import PopupWithForm from "./PopupWithForm";
import { usePopupClose } from "./hooks/usePopupClose";

function AddPlacePopup(props) {

    usePopupClose(props.isOpen, props.onClose)

    const [link, setLink] = React.useState('');
    const [name, setName] = React.useState('');

    React.useEffect(() => {
        setLink('');
        setName('');
    }, [props.isOpen])


    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddCard({
            link,
            name
        });
    }

    return (
        <PopupWithForm
            name='card'
            title='Новое место'
            buttonText={props.isLoading ? 'Создание...' : 'Создать'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_type_photo-name"
                onChange={handleChangeName}
                value={name}
                type="text"
                placeholder="Название"
                name="name"
                id="popup-input-photo-name"
                required
                minLength="2"
                maxLength="30"
            />
            <span className="popup__input-error popup-input-photo-name-error">Вы пропустили это поле.</span>
            <input
                className="popup__input popup__input_type_link"
                onChange={handleChangeLink}
                value={link}
                type="url"
                placeholder="Ссылка на картинку"
                name="link"
                id="popup-input-link"
                required
            />
            <span className="popup__input-error popup-input-link-error">Вы пропустили это поле.</span>
        </PopupWithForm>
    )


}

export default AddPlacePopup;