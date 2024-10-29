// src/components/ProcessDetails.tsx
import React, { FC } from 'react';
import Movement from './Movement';
import styles from '../styles/ProcessDetails.module.css'; // Importando CSS Modules

interface Party {
  name: string;
  role: string;
}

interface ProcessDetailsProps {
  process: {
    title: string;
    distributionDate: string;
    movements: { date: string; description: string }[];
    parties: Party[];
    caseValue: number;
    court: string;
    instance: string;
    type: string;
  } | null;
}

const ProcessDetails: FC<ProcessDetailsProps> = ({ process }) => {
  if (!process) return null; 

  return (
    <div className={styles.detailsContainer}>
      <h2>{process.title}</h2>
      <div className={styles.infoContainer}>
        <div className={styles.movements}>
          <h3>Movimentações</h3>
          {process.movements.map((movement, index) => (
            <Movement key={index} date={movement.date} description={movement.description} />
          ))}
        </div>
        <div className={styles.sidebar}>
          <div>
            <strong>Data de Distribuição:</strong> {process.distributionDate}
          </div>
          <div>
            <strong>Valor da Causa:</strong> R$ {process.caseValue.toFixed(2)}
          </div>
          <div>
            <strong>Tribunal:</strong> {process.court}
          </div>
          <div>
            <strong>Instância:</strong> {process.instance}
          </div>
          <div>
            <strong>Tipo:</strong> {process.type}
          </div>
          <div>
            <strong>Partes Envolvidas:</strong>
            <ul>
              {process.parties.map((party, index) => (
                <li key={index}>{party.name} ({party.role})</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessDetails;
