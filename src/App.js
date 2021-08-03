import { span } from "prelude-ls";
import React, { useState, useEffect } from "react";


export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/luizmigueldev/repos');
    const data = await response.json();

    setRepositories(data);
  }, []);

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    });

    setRepositories(newRepositories);
  }

  return (
    <ul>
      {
        repositories.map(repo => (
          <li key={repo.id} >
            {repo.name}
            {repo.favorite && <span>  ---Favorite---  </span>}
            <button onClick={() => handleFavorite(repo.id)}>Favorito</button>
          </li>
        ))
      }
    </ul>
  );
}
