import { forwardRef } from 'react';
import styles from '../styles/components/talking-character.module.scss';

type TypeTalkingCharacterProps = {
  person: 'aiSpeechBubble' | 'userSpeechBubble';
  onClick?: () => void
}

export const TalkingCharacter = forwardRef<HTMLDivElement, TypeTalkingCharacterProps>(({ person, onClick }, ref) => {
  return (
    <div
      ref={ref}
      className={`${person === 'aiSpeechBubble' ? styles['ai-container'] : styles['user-container']} ${styles['container']}`}
      onClick={onClick}
    >
      <div className={styles['effect-animation']}></div>
      <div className={styles['effect-background']}></div>
      <div className={styles['effect-hover']}></div>
      <span>{person === 'aiSpeechBubble' ? 'AI' : 'Відповісти'}</span>
    </div>
  );
});

TalkingCharacter.displayName = 'TalkingCharacter';