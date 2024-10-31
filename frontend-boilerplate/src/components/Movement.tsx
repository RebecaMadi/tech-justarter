// src/components/Movement.tsx
import { FC } from 'react';
import styles from '../styles/Movement.module.css'; // Importe o CSS correspondente

interface MovementProps {
  date: string;
  description: string;
  isBlocked?: boolean; 
}

const Movement: FC<MovementProps> = ({ date, description, isBlocked }) => {
  return (
    <div className={`${styles.movement} ${isBlocked ? styles.blocked : ''}`}>
      <div className={styles.date}>{date}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default Movement;
