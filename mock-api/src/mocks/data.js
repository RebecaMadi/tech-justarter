export const processes = [
    {
      id: '1',
      title: 'Processo 1 - TJAL',
      distributionDate: '2023-01-01',
      movements: [
        { date: '2023-01-01', description: 'Distribuição do processo' },
        { date: '2023-02-01', description: 'Primeira movimentação' },
      ],
      parties: [
        { name: 'Parte A', role: 'Requerente' },
        { name: 'Parte B', role: 'Requerido' },
      ],
      caseValue: 10000.00,
      court: 'TJAL',
      instance: 'Primeira Instância',
      type: 'Civil',
    },
    {
      id: '2',
      title: 'Processo 2 - TJCE',
      distributionDate: '2023-01-05',
      movements: [
        { date: '2023-01-05', description: 'Distribuição do processo' },
        { date: '2023-02-05', description: 'Primeira movimentação' },
      ],
      parties: [
        { name: 'Parte C', role: 'Requerente' },
        { name: 'Parte D', role: 'Requerido' },
      ],
      caseValue: 5000.00,
      court: 'TJCE',
      instance: 'Segunda Instância',
      type: 'Criminal',
    },
  ];
  

  export const searchProcesses = (query, court) => {
    return processes.filter(process => {
      const matchesQuery = process.title.toLowerCase().includes(query.toLowerCase());
  
      if (!court) {
        return matchesQuery;
      }
  
      return matchesQuery && process.court === court;
    });
  };
  
  