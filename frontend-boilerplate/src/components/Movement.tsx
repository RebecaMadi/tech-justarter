// src/components/Movement.tsx
import React, { FC } from 'react';
import styles from '../styles/Movement.module.css'; // Importando CSS Modules

interface MovementProps {
  date: string;
  description: string;
}

const Movement: FC<MovementProps> = ({ date, description }) => {
  return (
    <div className={styles.movement}>
      <span className={styles.date}>{date}</span>
      <span className={styles.description}>{description}</span>
    </div>
  );
};

export default Movement;
