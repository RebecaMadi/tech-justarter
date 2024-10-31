import React, { FC, useEffect } from 'react';
import styles from '../styles/OfferModal.module.css';
import { gql, useLazyQuery } from "@apollo/client";

interface OfferModalProps {
  onClose: () => void;
}

const SEARCH_MODAL = gql`
  query {
    nextPlanModal {
      header {
        title
        subtitle
      }
      body {
        benefits
        price {
          current
          next
          period
        }
        button {
          label
        }
      }
      footer {
        text
      }
    }
  }
`;

export const OfferModal: FC<OfferModalProps> = ({ onClose }) => {
  const [loadOfferData, { data, loading, error }] = useLazyQuery(SEARCH_MODAL);

  useEffect(() => {
    loadOfferData();
  }, [loadOfferData]);
  console.log("????????")
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar a oferta.</p>;

  const offerData = data?.nextPlanModal;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>×</button>
        
        <div className={styles.modalHeader}>
          <h2>{offerData?.header.title}</h2>
          <p>{offerData?.header.subtitle}</p>
        </div>
        
        <div className={styles.modalBody}>
          <ul className={styles.benefitsList}>
            {offerData?.body.benefits.map((benefit: string, index: number) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          
          <div className={styles.priceInfo}>
            <strong>{offerData?.body.price.current} no {offerData?.body.price.period}</strong>
            <p>Depois {offerData?.body.price.next}</p>
          </div>
          
          <button className={styles.subscribeButton}>{offerData?.body.button.label}</button>
        </div>
        
        <div className={styles.footerText}>
          <p>{offerData?.footer.text}</p>
        </div>
      </div>
    </div>
  );
};

