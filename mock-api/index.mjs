import express from "express";
import { responseBoxLock } from "./src/mocks/box-lock.mjs";
import { getRandomResponse } from "./src/mocks/argos-lock.mjs";
import { processes, searchProcesses } from "./src/mocks/data.js";

const app = express();
const port = 9777;

app.set("json spaces", 2);

app.get("/search-serp/:id", (req, res) => {
  const { id } = req.params; 
  const process = processes.find(p => p.id === id); 
  console.log("????");
  if (process) {
    console.log(process);
    res.json(process); 
  } else {
    res.status(404).json({ message: "Processo não encontrado" }); 
  }
});

app.get("/search-serp", (req, res) => {
  const { query } = req.query; 
  const filteredResults = searchProcesses(query || ""); // Filtra resultados usando a função searchProcesses
  res.json(filteredResults);
});

app.get("/box-lock", (req, res) => {
  res.json(responseBoxLock);
});

app.get("/experiment/participate", (req, res) => {
  const responseBody = getRandomResponse(req);
  res.status(200).json(responseBody);
});

app.listen(port, () => {
  console.log(`Mock API running at http://localhost:${port}`);
});
