import '../index.css';

import { useAuthForm } from '@/shared/hooks/useAuthForm';

export const Register = () => {
  const { email, setEmail, password, setPassword, error, isSubmitting, handleSubmit } =
    useAuthForm('register');

  return (
    <main className='content'>
      <h2 className='content__header'>Регистрация</h2>
      <form onSubmit={handleSubmit} className='auth-form'>
        <div className='auth-form__field'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='auth-form__field'>
          <label htmlFor='password'>Пароль</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className='auth-form__error'>{error}</div>}
        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
    </main>
  );
};


