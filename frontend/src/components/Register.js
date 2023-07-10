import React from "react";
import { Link} from 'react-router-dom';

export const Register = ({onSubmit}) => {

  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value

    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValues;
    onSubmit(password, email)    
  }

  return (
    <div className="login">
      <form className="login__form" name="register" id="register" onSubmit={handleSubmit}>
        <h2 className="login__heading">Регистрация</h2>
        <input className="login__input" onChange={handleChange} value={formValues.email} name="email" autoComplete="email" id="login-email" type="email" placeholder="Email" required></input>
        <input className="login__input login__input_type_password" onChange={handleChange} value={formValues.password} autoComplete="new-password" name="password" id="login-password" type="password" placeholder="Пароль" required></input>
        <button className="login__submit" type="submit" >Зарегистрироваться</button>
        <p className="login__question">Уже зарегистрированы? <Link to='/sign-in' className="login__link">Войти</Link></p>
      </form>
    </div>
  );
}