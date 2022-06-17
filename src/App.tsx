import React, { useEffect, useState } from "react";
import { Breeds } from "./components/Breeds";

const App = () => {
  interface iCat {
    breeds: [];
    heights: number;
    id: string;
    url: string;
    width: number;
  }
  const [cats, setCats] = useState<iCat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search", {
      headers: {
        "x-api-key": process.env.REACT_APP_CAT_API_KEYS || "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCats(data);
        setLoading(false);
      })
      .catch((error) => setError(error));
  }, []);

  const searchByBreed = (breedId: string) => {
    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
      headers: {
        "x-api-key": process.env.REACT_APP_CAT_API_KEYS || "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCats(data);
        setLoading(false);
      })
      .catch((error) => setError(error));
  };

  const handleSearchByBreed = (breedId: string) => {
    setLoading(true);
    searchByBreed(breedId);
  };

  return (
    <div className="container">
      <h1>Cats</h1>
      <Breeds handleSearchByBreed={handleSearchByBreed} setError={setError} />
      {loading ? (
        <div>
          <h1> Loading... </h1>
        </div>
      ) : (
        <div id="test">
          {error ? (
            <div>
              <h1> Error: {error} </h1>
            </div>
          ) : (
            cats &&
            cats.map((cat: iCat) => (
              <div key={cat.id}>
                <img src={cat.url} alt={cat.id} className="cat-image" />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default App;
