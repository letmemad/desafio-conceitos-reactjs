import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  useEffect(() => {
    function fetchRepositories() {
      api.get('/repositories').then((response) => {
        setRepositories(response.data)
      })
    }

    fetchRepositories()
  }, [])

  async function handleAddRepository() {
    const data = {
      title: "Desafio ReactJS",
      url: "http://reactjs.org",
      techs: ["Reactjs", "Nodejs"]
    }
    api.post('/repositories', data).then((response) => {
      return setRepositories([...repositories, response.data])
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() => {
      const result = repositories.filter((repo) => {
        return repo.id !== id
      })

      return setRepositories(result)
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map((repo) => (
            <li key={repo.id} >
              { repo.title }

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
          </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
