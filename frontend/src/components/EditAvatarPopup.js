import React from "react";
import PopupWithForm from "./PopupWithForm";
import { usePopupClose } from "./hooks/usePopupClose";

function EditAvatarPopup(props) {
    
    usePopupClose(props.isOpen, props.onClose)

    const linkRef = React.useRef();

    React.useEffect(() => {
        linkRef.current.value = '';
    }, [props.isOpen])


    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: linkRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name='avatar-edit'
            title='Обновить аватар'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
        >
            <input className="popup__input popup__input_type_link" ref={linkRef} type="url" placeholder="Ссылка на картинку" name="link" id="popup-input-link-avatar" required />
            <span className="popup__input-error popup-input-link-avatar-error">Ошибка</span>
        </PopupWithForm>
    )


}

export default EditAvatarPopup;