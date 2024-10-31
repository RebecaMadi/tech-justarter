import React, { FC } from 'react';
import Movement from './Movement';
import styles from '../styles/ProcessDetails.module.css';

interface RelatedPerson {
  name: string;
  role: string;
}

interface Lawyer {
  name: string;
  representedPerson: string;
}

interface ProcessDetailsProps {
  process: {
    id: string;
    number: string;
    distributionDate: string;
    movements: { date: string; description: string }[];
    related_people: RelatedPerson[];
    representedPersonLawyers: Lawyer[];
    caseValue: number;
    court: string;
    type: string;
    nature: string;
    judge: string;
  } | null;
  variant: string;
  onShowOfferModal: () => void;
}

const ProcessDetails: FC<ProcessDetailsProps> = ({ process, variant, onShowOfferModal }) => {
  if (!process) return null;

  const isVariantA = variant === 'variant-a';
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.detailsContainer}>
      <h2>{`Processo nº ${process.number} do ${process.court}`}</h2>
      <p>Distribuído em: {formatDate(process.distributionDate)}</p> 
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
              date={formatDate(movement.date)} 
              description={movement.description} 
              isBlocked={isVariantA && index === 0} 
            />
          ))}
        </div>
        <div className={styles.sidebar}>
          <div>
            <strong>Valor da Causa:</strong> R$ {process.caseValue.toFixed(2)}
          </div>
          <div>
            <strong>Tribunal:</strong> {process.court}
          </div>
          <div>
            <strong>Tipo:</strong> {process.type}
          </div>
          <div>
            <strong>Natureza:</strong> {process.nature}
          </div>
          <div>
            <strong>Juiz:</strong> {process.judge}
          </div>
          <div className={styles.highlightContainer}>
            <div className={styles.highlightTitle}>Partes Envolvidas:</div>
            <ul className={styles.partiesList}>
              {process.related_people.map((party, index) => (
                <li key={index} className={styles.partyItem}>
                  <span className={styles.partyName}>{party.name}</span>
                  <span className={styles.partyRole}> ({party.role})</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.highlightContainer}>
            <div className={styles.highlightTitle}>Advogados das Partes:</div>
            <ul className={styles.partiesList}>
              {process.representedPersonLawyers.map((lawyer, index) => (
                <li key={index} className={styles.lawyerItem}>
                  <span className={styles.lawyerName}>{lawyer.name}</span>
                  <span className={styles.representedPerson}>{lawyer.representedPerson}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessDetails;
