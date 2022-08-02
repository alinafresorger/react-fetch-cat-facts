import { useState, useEffect, useCallback } from "react";
import Cat from "./components/Cat";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reload
  const [reload, setReload] = useState(0);

  const doReload = useCallback((e) => {
    e.preventDefault();
    setReload((currentReloadValue) => currentReloadValue + 1);
  }, []);
  //

  useEffect(() => {
    console.log("fetch");
    let mounted = true;
    // reset state
    setLoading(true);
    setError(null);
    // reset state
    fetch("https://meowfacts.herokuapp.com/")
      .then((res) => res.json())
      //.then(({data}) => setData(data)); // more concise
      .then((data) => {
        if (!mounted) return;
        setData(data.data);
        setLoading(false);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e);
      });
    return () => {
      mounted = false;
    };
  }, [reload]);

  console.log("DATA", data);

  return (
    <div className="container my-3">
      <div className="card text-center">
        <img
          src="https://i.kym-cdn.com/entries/icons/original/000/000/574/moarcover.jpg"
          class="card-img-top"
          alt="..."
        ></img>
        <div className="card-body">
          <h1 className="card-title">Random Cat Facts</h1>
          {loading && <div className="card-text">Loading...</div>}
          {error && <div className="card-text text-danger">Error: {error.message}</div>}
          {data.map((el, index) => (
            <Cat key={index} data={el} />
          ))}
          <p>
            <img />
          </p>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary" onClick={doReload}>
            MOAR CAT FACTS!!!11
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
