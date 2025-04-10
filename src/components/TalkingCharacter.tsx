import styles from '../styles/components/talking-character.module.scss';
import { forwardRef } from 'react';

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
        <span>{person === 'aiSpeechBubble' ? 'AI' : 'Відповісти'}</span>
      </div>
    );
  });

  TalkingCharacter.displayName = 'TalkingCharacter';