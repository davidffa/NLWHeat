import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';

import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';

import { api } from '../../services/api';

import styles from './styles.module.scss';

export function SendMessgeForm() {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  async function handleSendMessage(e: FormEvent) {
    e.preventDefault();

    if (!message.trim()) return;

    await api.post('messages', { message });

    setMessage('');
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>

        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          onChange={e => setMessage(e.target.value)}
          value={message}
        />

        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  )
}