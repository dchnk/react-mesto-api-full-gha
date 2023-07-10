import React from "react";

export const Login = ({onSubmit}) => {

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
    onSubmit(password, email);    
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit} name="login" id="login">
        <h2 className="login__heading">Вход</h2>
        <input className='login__input login__input_type_email'onChange={handleChange} value={formValues.email} name="email" id="register-email" type="email" placeholder="Email" required></input>
        <input className='login__input login__input_type_password' onChange={handleChange} value={formValues.password} name="password" id="register-password" type="password" placeholder="Пароль" required></input>
        <button className="login__submit" type="submit" >Войти</button>
      </form>
    </div>
  );
}