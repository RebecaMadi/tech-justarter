import { FC } from "react";
import ResultItem from "./ResultItem";
import styles from '../styles/ResultList.module.css'; 

interface ResultListProps {
  results: { id: string; title: string; description: string }[];
  onSelect: (id: string) => void;
}

const ResultList: FC<ResultListProps> = ({ results, onSelect }) => {
  return (
    <div className={styles.resultList}> {}
      {results.map((result) => (
        <div 
          key={result.id} 
          className={styles.resultItem}
          onClick={() => onSelect(result.id)} 
        >
          <ResultItem 
            id={result.id} 
            title={result.title} 
            description={result.description} 
            onSelect={onSelect} 
          />
        </div>
      ))}
    </div>
  );
};

export default ResultList;
