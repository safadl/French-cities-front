import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import {METROP_URL} from "./api/constants"
import {OUTRE_URL} from "./api/constants"
import VilleSection from "./components/VilleSection";
function App() {
  const [metrop, setMetr] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoading1, setLoading1] = useState(true);
  const [outre, setOutre] = useState([]);
  const [searchVille, setSearchVille] = useState("");
  const [searched, setSearched] = useState([]);
  const [searched1, setSearched1] = useState([]);
  const [found, setFound] = useState(false);
 
  useEffect(() => {
    //fetch villes metropolitaines
    axios
      .get(METROP_URL)
      .then((res) => {
        setMetr(res.data);
        setSearched(res.data);
        setLoading(false);
      })

      .catch((err) => console.log(err));
    //fetch villes d'outre mer
    axios
      .get(OUTRE_URL)
      .then((res) => {
        setOutre(res.data);
        setSearched1(res.data);
        setLoading1(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleChange = (event) => {
    setSearchVille(event.target.value);

    console.log(searchVille.trim());
    const results = metrop.filter((item) => {
      return (
        item.nomCommune.toLowerCase().includes(event.target.value) ||
        item.codePostal.includes(searchVille.trim())
      );
    });

    const results1 = outre.filter((item) => {
      return (
        item.nomCommune.toLowerCase().includes(event.target.value) ||
        item.codePostal.includes(searchVille.trim())
      );
    });
    setSearched(results);
    setSearched1(results1);
    setFound(true);
  };

  return (
    <div className="Container">
      <div className="subContainer">
        <p className="searchTitle">Je recherche...</p>
        <input
          className="input"
          onSubmit={handleChange}
          type="text"
          id="search"
          placeholder="...une ville, un code postal"
          value={searchVille}
          onChange={handleChange}
        />
      </div>

      <div className="villeContainer">
        <VilleSection
          title="Villes de métropole"
          searchedData={searched}
          isLoading={isLoading}
          found={found}
        />

        <VilleSection
          title="Villes d'outre-mer"
          searchedData={searched1}
          isLoading={isLoading1}
          found={found}
        />
      </div>
    </div>
  );
}

export default App;
