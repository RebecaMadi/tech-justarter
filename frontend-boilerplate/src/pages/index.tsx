import { gql, useLazyQuery } from "@apollo/client";
import { useState, FC } from "react";
import SearchBar from "../components/SearchBar";
import ResultList from "../components/ResultList";
import ProcessDetails from "../components/ProcessDetails";

// Definição da consulta para buscar processos
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

// Definição da consulta para buscar detalhes do processo
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

// Componente principal da página
const Home: FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<any | null>(null);

  // Hook para buscar processos
  const [searchProcesses, { loading: loadingSearch }] = useLazyQuery(SEARCH_PROCESSES_QUERY, {
    onCompleted: (data) => {
      setResults(data.search);
      setSelectedProcess(null);
    },
    onError: (error) => {
      console.error("Erro ao buscar processos:", error);
    },
  });

  // Hook para buscar detalhes do processo
  const [getProcessDetails, { loading: loadingDetails }] = useLazyQuery(GET_PROCESS_DETAILS_QUERY, {
    onCompleted: (data) => {
      console.log("Detalhes do processo recebidos:", data.searchbyid);
      setSelectedProcess(data.searchbyid); 
    },
    onError: (error) => {
      console.error("Erro ao buscar detalhes do processo:", error);
    },
  });

  // Função para lidar com a busca
  const handleSearch = (query: string, court: string) => {
    console.log("Buscando por:", query, "Com filtro:", court);
    searchProcesses({ variables: { query, court } }); // Corrigido: 'court' ao invés de 'filter'
  };

  // Função para lidar com a seleção do processo
  const handleSelectProcess = (id: string) => {
    console.log("Processo selecionado:", id);
    const selected = results.find(result => result.id === id);
    if (selected) {
      getProcessDetails({ variables: { id } });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>MiniJus</h1>
      <SearchBar onSearch={handleSearch} />
      {loadingSearch && <p>Loading...</p>}
      {!selectedProcess && (
        <ResultList results={results} onSelect={handleSelectProcess} />
      )}
      {selectedProcess && <ProcessDetails process={selectedProcess} />}
      {loadingDetails && <p>Loading details...</p>}
    </div>
  );
};

export default Home;
