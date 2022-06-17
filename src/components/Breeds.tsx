import React, { useEffect, useState, FC } from "react";

export interface iBreeds {
  name: string;
  id: string;
}

interface Props {
  handleSearchByBreed: (breedId: string) => void;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const Breeds: FC<Props> = ({ handleSearchByBreed, setError }) => {
  const [breeds, setBreeds] = useState<iBreeds[]>([]);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds", {
      headers: {
        "x-api-key": process.env.REACT_APP_CAT_API_KEYS || "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBreeds(data);
      })
      .catch((error) => setError(error));
  }, [setError]);

  return (
    <div className="fixed-bar">
      <div className="title-container">
        <h1 className="title">Search by breed</h1>
      </div>
      <div>
        {breeds &&
          breeds.map((breed) => (
            <div
              key={breed.id}
              onClick={() => handleSearchByBreed(breed.id)}
              className="breed-container"
            >
              <button className="breed-names">{breed.name}</button>
            </div>
          ))}
      </div>
    </div>
  );
};

Breeds.displayName = "Breeds";