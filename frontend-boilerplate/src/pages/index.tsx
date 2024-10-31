import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useState, FC } from "react";
import SearchBar from "../components/SearchBar";
import ResultList from "../components/ResultList";
import ProcessDetails from "../components/ProcessDetails";
import { OfferModal } from "../components/OfferModal";
import styles from '../styles/Home.module.css';

const SEARCH_PROCESSES_QUERY = gql`
  query SearchProcesses($query: String!, $court: String) {
    search(query: $query, court: $court) {
      id
      title
      distributionDate
      movements {
        date
        description
      }
      parties {
        name
        role
      }
      caseValue
      court
      instance
      type
    }
  }
`;

const GET_PROCESS_DETAILS_QUERY = gql`
  query GetProcessDetails($id: String!) {
    searchbyid(id: $id) {
      id
      title
      distributionDate
      movements {
        date
        description
      }
      parties {
        name
        role
      }
      caseValue
      court
      instance
      type
    }
  }
`;

const SORTED_EXP_QUERY = gql`
  query GetExperimentVariant($alternative: String) {
    experimentData(alternative: $alternative) { 
      status
      experiment_group {
        name
      }
      experiment {
        name
      }
      alternative {
        name
      }
      client_id
      participating
      simulating
    }
  }
`;

const Home: FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<any | null>(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [variant, setVariant] = useState<string | null>(null);
  const [alternative, setAlternative] = useState<string | null>(null); 
  const [simulating, _] = useState<boolean>(true); 

  const { loading: loadingVariant, error: variantError } = useQuery(SORTED_EXP_QUERY, {
    variables: { alternative }, 
    onCompleted: (data) => {
      if (data.experimentData?.alternative) {
        const variantName = data.experimentData.alternative.name;
        setVariant(variantName);
      }
    },
    onError: (error) => {
      console.error("Erro ao buscar variante do experimento:", error);
    },
  });

  const [searchProcesses, { loading: loadingSearch }] = useLazyQuery(SEARCH_PROCESSES_QUERY, {
    onCompleted: (data) => {
      setResults(data.search);
      setSelectedProcess(null);
    },
    onError: (error) => {
      console.error("Erro ao buscar processos:", error);
    },
  });

  const [getProcessDetails, { loading: loadingDetails }] = useLazyQuery(GET_PROCESS_DETAILS_QUERY, {
    onCompleted: (data) => {
      setSelectedProcess(data.searchbyid); 
    },
    onError: (error) => {
      console.error("Erro ao buscar detalhes do processo:", error);
    },
  });

  const handleSearch = (query: string, court: string) => {
    searchProcesses({ variables: { query, court } });
  };

  const handleSelectProcess = (id: string) => {
    const selected = results.find(result => result.id === id);
    if (selected) {
      getProcessDetails({ variables: { id } });
    }
  };

  const handleShowOfferModal = () => {
    setShowOfferModal(true);
  };

  const handleCloseOfferModal = () => {
    setShowOfferModal(false);
  };

  const updateQueryParameters = (newAlternative: string) => {
    setAlternative(newAlternative);
  };

  return (
    <div className={styles.container}>
      <h1>Buscador de Processos</h1>
      {simulating && (
        <div className={styles.queryParameters}>
          <input 
            className={styles.input} 
            type="text" 
            placeholder="Alternative"
            value={alternative || ""}
            onChange={(e) => updateQueryParameters(e.target.value)}
          />
          <button className={styles.button} onClick={() => updateQueryParameters(alternative || "")}>
            Testar variantes
          </button>
        </div>
      )}
      <SearchBar onSearch={handleSearch} />
      {loadingSearch && <p className={styles.loading}>Loading...</p>}
      {!selectedProcess && <ResultList results={results} onSelect={handleSelectProcess} />}
      {selectedProcess && (
        <ProcessDetails
          process={selectedProcess}
          variant={variant || "variant-a"} 
          onShowOfferModal={handleShowOfferModal}
        />
      )}
      {loadingDetails && <p className={styles.loading}>Loading details...</p>}
      {showOfferModal && <OfferModal onClose={handleCloseOfferModal} />}
    </div>
  );
};

export default Home;
