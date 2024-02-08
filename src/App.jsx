import React, { useState } from "react";
import "./App.css";
import code_tower_hanoi from "./utils/code_tower_hanoi";

const App = () => {
  const [numAros, setNumAros] = useState(0);
  const [linesAros, setLinesAros] = useState([]);
  const [steps, setSteps] = useState(0);
  const [objSolution, setObjSolution] = useState({});

  // code_tower_hanoi(9, "A", "B", "C");

  const handleInputChange = (event) => {
    const num = parseInt(event.target.value);
    setNumAros(isNaN(num) ? 0 : num);
    renderAros(num);
    setSteps(2 ** num - 1);
  };
  function crearArrayConCantidadDeElementos(cantidad) {
    let array = [];
    for (let i = 0; i < cantidad; i++) {
      array.push(i);
    }
    return array;
  }
  const renderAros = (num) => {
    const aros = [];
    var cant = 1;
    var result = 0;
    for (let i = 0; i < num; i++) {
      result = crearArrayConCantidadDeElementos(cant + i);
      aros.push(
        <div className="aro" key={i}>
          {result.map((e, i) => {
            return "▄";
          })}
        </div>
      );
      cant++;
    }
    setLinesAros(aros);
    return;
  };

  function initCodeTowerHanoi() {
    const result = code_tower_hanoi(numAros, "A", "B", "C");
    console.log(result);
    setObjSolution(result);
  }
  function reset() {
    setNumAros(0);
    setLinesAros([]);
    setSteps(0);
    setObjSolution({});
    return;
  }
  return (
    <div className="app">
      <div className="header">
        <h1>TORRE DE HANOI en JS</h1>
        <h3>Algoritmo de la torre de hanoi en javascript </h3>
      </div>
      <div className="footer"></div>
      <div className="container">
        <div className="box zthin">
          <div className="in">
            <div>
              <label htmlFor="numAros">Cantidad inicial de aros en A = </label>
              <input
                type="number"
                id="numAros"
                onChange={handleInputChange}
                value={numAros}
              />
            </div>
            <button onClick={initCodeTowerHanoi}>Aplicar</button>
            <button onClick={reset}>Reiniciar</button>
          </div>
        </div>
        <div className="box">
          <h4>ORIGEN</h4>
          <div className="torre">
            {linesAros &&
              linesAros.map((l, i) => {
                return l;
              })}
          </div>
          <div key={"100"}>█████</div>
          <h4>A</h4>
        </div>
        <div className="box thin">
          <h4>AUXILIAR</h4>
          {linesAros &&
            linesAros.map((l, i) => {
              return <div key={i}>█</div>;
            })}
          <div key={"101"}>█████</div>
          <h4>B</h4>
        </div>
        <div className="box thin">
          <h4>DESTINO</h4>
          {linesAros &&
            linesAros.map((l, i) => {
              return <div key={i}>█</div>;
            })}
          <div key={"102"}>█████</div>
          <h4>C</h4>
        </div>
        <div className="box wide">
          <h3>SOLUCIÓN - PASO A PASO</h3>
          <h4>La cantidad de pasos a realizar son: {steps}</h4>
          <div>
            {Object.keys(objSolution)?.map((s, i) => {
              console.log("in map");
              return (
                <div key={i} className="solution">
                  <p>Paso {s}</p>
                  <h4>Mover {objSolution[s]}</h4>
                </div>
              );
            })}
          </div>
        </div>
        <div className="box ythin"></div>
      </div>
      <div className="footera">
        <div className="row">
          <p>
            Se cuenta una historia sobre un templo en la India en Kashi
            Vishwanath que contiene una gran sala con tres postes gastados por
            el tiempo, rodeada de 100 discos dorados. Los sacerdotes de Brahma,
            actuando bajo el mandato de una antigua profecía, han estado
            moviendo estos discos de acuerdo con las reglas inmutables de Brahma
            desde ese momento.
          </p>
          
          <p>
            Por lo tanto, el acertijo también se conoce como el rompecabezas de
            la Torre de Brahma. Según la leyenda, cuando se complete el último
            movimiento del rompecabezas, el mundo se terminará.
          </p>
          <h4>
            Code en:
            https://github.com/HX-MLuquez/tower_of_hanoi-in-javascript-
          </h4>
        </div>
      </div>
    </div>
  );
};

export default App;
