import { FC } from "react";

interface ResultItemProps {
  id: string;
  title: string;
  description: string;
  onSelect: (id: string) => void; 
}

const ResultItem: FC<ResultItemProps> = ({ id, title, description, onSelect }) => {
  return (
    <div onClick={() => onSelect(id)}  className="result-item" >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ResultItem;
