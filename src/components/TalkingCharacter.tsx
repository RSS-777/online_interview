import { forwardRef } from 'react';
import styles from '../styles/components/talking-character.module.scss';

type SpeakerType = 'ai' | 'user';

type TalkingCharacterProps = {
  speaker: SpeakerType;
  onClick?: () => void;
}

export const TalkingCharacter = forwardRef<HTMLDivElement, TalkingCharacterProps>(({ speaker, onClick }, ref) => {
  const isAiSpeaker = speaker === 'ai';

  return (
    <div
      ref={ref}
      className={`${isAiSpeaker ? styles['ai-container'] : styles['user-container']} ${styles['container']}`}
      onClick={onClick}
    >
      <div className={styles['effect-animation']}></div>
      <div className={styles['effect-background']}></div>
      <div className={styles['effect-hover']}></div>
      <span>{isAiSpeaker ? 'AI' : 'Відповісти'}</span>
    </div>
  );
});

TalkingCharacter.displayName = 'TalkingCharacter';
