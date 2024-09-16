import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import code_tower_hanoi from "./utils/code_tower_hanoi";

const App = () => {
  const [count, setCount] = useState(0);
  const [numAros, setNumAros] = useState(0);

  const [steps, setSteps] = useState(0);
  const [objSolution, setObjSolution] = useState({});
  const [clickOnOff, setClickOnOff] = useState(false);
  const [firstMove, setFirstMove] = useState("");
  const [finish, setFinish] = useState(false);

  const [lines, setLines] = useState({
    origin: [],
    aux: [],
    destiny: [],
  });

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

    setLines((l) => {
      return {
        ...l,
        origin: aros,
      };
    });
    return;
  };

  function initCodeTowerHanoi() {
    if (Object.keys(objSolution).length > 0) {
      alert(
        "El juego ya se ha iniciado \n Si quieres iniciar de nuevo primero selecciona 'Reiniciar'"
      );
      return;
    }
    const result = code_tower_hanoi(numAros, "A", "B", "C");

    setObjSolution(result);
  }
  function reset() {
    setNumAros(0);
    setLines({
      origin: [],
      aux: [],
      destiny: [],
    });
    setSteps(0);
    setObjSolution({});
    setFinish(false);
    setCount(0);
    setFirstMove("");
    setClickOnOff(false);
    return;
  }

  function movePiece(e) {
    if (finish)
      return alert(
        `Felicidades!!!! Lo has conseguido en ${count} pasos!!! \n Si quieres volver a jugar selecciona 'Reiniciar'`
      );
    const move = e.currentTarget.getAttribute("name");

    if (!clickOnOff) {
      if (lines[move].length === 0)
        return alert(`Esta columna ${move} no contiene ningún aro`);
      setFirstMove(move);
      setClickOnOff(true);
    } else {
      // console.log("first move --> ",lines[firstMove].length !== 0 &&lines[firstMove][0].props.children);
      // console.log("second move --> ",lines[move].length !== 0 &&lines[move][0].props.children);
      if (firstMove === move) {
      } else if (
        lines[move].length === 0 ||
        lines[move][0].props.children.length >
          lines[firstMove][0].props.children.length
      ) {
        var newLines = [...lines[firstMove]];
        var piece = newLines.shift();
        setLines((l) => {
          return {
            ...l,
            [firstMove]: newLines,
            [move]: [piece, ...l[move]],
          };
        });
        setCount((num) => num + 1);
        if (move === "destiny" && lines[move].length + 1 === numAros) {
          setFinish(true);
          alert(
            `Felicidades!!!! Lo has conseguido en ${
              count + 1
            } pasos!!! \n Si quieres volver a jugar selecciona 'Reiniciar'`
          );
          return;
        }
      } else {
        alert(
          "La pieza seleccionada no puede ser mayor a la que se encuentra donde alojar"
        );
        return;
      }

      setFirstMove("");
      setClickOnOff(false);
    }
  }

  return (
    <div className="container-fluid">
      <div className="dflex">
        {/* Main Content */}
        <div className="flex-grow-1">
          {/* Header */}
          <div className="container row d-none d-md-block p-2">
            <div className="col">
              <div className="h-100 p-4 text-white bg-dark rounded-1">

                  <h1>Torre de HANOI</h1>


                <p className="p-2">
                  Juego creado con JS. Puedes encontrar las soluciones con su recorrido más corto 
                </p>
              </div>
            </div>
          </div>

          <div className="container mt-1">
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex align-items-center">
                <label htmlFor="numAros" className="form-label me-3">
                  AROS
                </label>
                <input
                  type="number"
                  id="numAros"
                  className="form-control w-25 me-3"
                  onChange={handleInputChange}
                  value={numAros}
                  style={{ padding: "8px" }}
                />
                <div className="box wide">
                  <h4 style={{ color: "rgb(43, 70, 146)" }}>
                    Realizaste « {count} » pasos
                  </h4>
                </div>
              </div>

              <div
                className="btn-group mb-1"
                role="group"
                aria-label="Control Buttons"
              >
                <button
                  className="btn btn-primary me-5"
                  onClick={initCodeTowerHanoi}
                >
                  Aplicar Solución
                </button>
                <button className="btn btn-secondary" onClick={reset}>
                  Reiniciar
                </button>
              </div>
            </div>

            <div className="#">
              <div className="d-flex justify-content-center flex-wrap">
                
                <div
                  className="box center me-3 fixed-size"
                  onClick={movePiece}
                  name="origin"
                >
                  <h4>ORIGEN</h4>
                  <div className="torre">
                    {lines.origin && lines.origin.map((l, i) => l)}
                  </div>
                  <div key={"100"}>█████</div>
                  <h4>A</h4>
                </div>
                <div
                  className="box center me-3 fixed-size"
                  onClick={movePiece}
                  name="aux"
                >
                  <h4>AUXILIAR</h4>
                  {lines.aux && lines.aux.map((l, i) => <div key={i}>{l}</div>)}
                  <div key={"101"}>█████</div>
                  <h4>B</h4>
                </div>
                <div
                  className="box center me-3 fixed-size"
                  onClick={movePiece}
                  name="destiny"
                >
                  <h4>DESTINO</h4>
                  {lines.destiny &&
                    lines.destiny.map((l, i) => <div key={i}>{l}</div>)}
                  <div key={"102"}>█████</div>
                  <h4>C</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="container mt-5">
            <div
              className="col text-center bg-secondary p-2 text-white"
              style={{ color: "gray" }}
            >
              <p>
              En el antiguo templo de Kashi Vishwanath en la India, se encuentra una sala venerable con tres 
              postes desgastados por el paso del tiempo, rodeados por 100 discos dorados de gran belleza. 
              Según la leyenda, los sacerdotes de Brahma, guiados por una antigua profecía, han estado 
              moviendo estos discos siguiendo las reglas sagradas de Brahma desde tiempos inmemoriales.
              </p>
              <p>
              Este enigma, conocido también como el rompecabezas de la Torre de Brahma, es más que un 
              simple desafío. La leyenda afirma que cuando se complete el último movimiento de este 
              rompecabezas, el mundo llegará a su fin.
              </p>
              <a
                href="https://github.com/HX-MLuquez/tower_of_hanoi-in-javascript-"
                target="_blank"
                className="text-white"
              >
                <h4 style={{ fontWeight: "800", color: "#3f246f" }}>
                  Code in GitHub
                </h4>
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar Solution */}
        <div
          className="top-0 end-0 p-3"
          style={{
            width: "300px",
            height: "100vh",
            overflowY: "auto",
            backgroundColor: "#f8f9fa",
            borderLeft: "2px solid #dee2e6",
            boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 className="#">SOLUCIÓN</h3>
          <h4>La cantidad de pasos son: {steps}</h4>
          <div className="steps">
            {Object.keys(objSolution).length !== 0 ? (
              Object.keys(objSolution).map((s, i) => (
                <div key={i} className="solution mb-3">
                  <p>Paso {s}</p>
                  <h4>Mover {objSolution[s]}</h4>
                </div>
              ))
            ) : (
              <div className="solution mb-3">
                <p></p>
                <h4></h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
