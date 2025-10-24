import './index.css';

export function Header() {
  return (
    <header className='header'>
      <img src='/logo.jpg' alt='логотип' className='header__logo' />
      <h1>Столплит</h1>
      <form className='header__form'>
        <div className='header__inputs'>
          <input placeholder='логин' type='text' />
          <input placeholder='пароль' type='password' />
        </div>
        <div className='header__buttons'>
          <button type='button'>войти</button>
          <a href='#'>регистрация</a>
        </div>
      </form>
    </header>
  );
}
