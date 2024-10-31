import React, { FC } from 'react';
import Movement from './Movement';
import styles from '../styles/ProcessDetails.module.css';

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
  variant: string;
  onShowOfferModal: () => void;
}

const ProcessDetails: FC<ProcessDetailsProps> = ({ process, variant, onShowOfferModal }) => {
  if (!process) return null;

  const isVariantA = variant === 'variant-a';

  return (
    <div className={styles.detailsContainer}>
      <h2>{process.title}</h2>
      <div className={styles.infoContainer}>
        <div className={styles.movements}>
          <h3>Movimentações</h3>
          {isVariantA && (
            <button onClick={onShowOfferModal} className={styles.offerButton}>
            Ver Oferta
            </button>
          )}
          
          {process.movements.map((movement, index) => (
            <Movement 
              key={index} 
              date={movement.date} 
              description={movement.description} 
              isBlocked={isVariantA} // Passa a propriedade isBlocked
            />
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
