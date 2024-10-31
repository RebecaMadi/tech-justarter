export const processes = [
  {
    id: "1235",
    number: "0001234-56.2023.8.19.0001",
    court: "TJAL",
    nature: "Cível",
    type: "Ação de Indenização",
    subject: "Danificação de imagem",
    distributionDate: "2023-01-15",
    judge: "Dr. João da Silva",
    caseValue: 100000.00,
    related_people: [
      {
        name: "Pablo Vegetti",
        role: "Autor"
      },
      {
        name: "Clube de Regatas Vasco da Gama",
        role: "Réu"
      }
    ],
    lawyers: [
      {
        name: "Dr. Carlos Almeida"
      }
    ],
    movements: [
      {
        date: "2023-02-10",
        description: "Distribuição da ação"
      },
      {
        date: "2023-03-05",
        description: "Audiência de conciliação"
      }
    ]
  },
  {
    id: "12345",
    number: "0001234-56.2023.6.19.0001",
    court: "TJCE",
    nature: "Cível",
    type: "Ação de Indenização",
    subject: "Danificação de imagem",
    distributionDate: "2023-01-15",
    judge: "Dr. João da Silva",
    caseValue: 100000.00,
    related_people: [
      {
        name: "Pablo Vegetti",
        role: "Autor"
      },
      {
        name: "Clube de Regatas Vasco da Gama",
        role: "Réu"
      }
    ],
    lawyers: [
      {
        name: "Dr. Carlos Almeida"
      }
    ],
    movements: [
      {
        date: "2023-02-10",
        description: "Distribuição da ação"
      },
      {
        date: "2023-03-05",
        description: "Audiência de conciliação"
      }
    ]
  }
  ];
  

  export const searchProcesses = (query, court) => {
    return processes.filter(process => {
      const matchesQuery = process.number.toLowerCase().includes(query.toLowerCase());
  
      if (!court) {
        return matchesQuery;
      }
  
      return matchesQuery && process.court === court;
    });
  };
  
  