import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
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
          {result.map((e, i) => "▄")}
        </div>
      );
      cant++;
    }

    setLines((l) => ({
      ...l,
      origin: aros,
    }));
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
      if (firstMove === move) {
      } else if (
        lines[move].length === 0 ||
        lines[move][0].props.children.length >
          lines[firstMove][0].props.children.length
      ) {
        var newLines = [...lines[firstMove]];
        var piece = newLines.shift();
        setLines((l) => ({
          ...l,
          [firstMove]: newLines,
          [move]: [piece, ...l[move]],
        }));
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
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="display-4">TORRE DE HANOI en JS</h1>
      </div>
      <div className="d-flex flex-column align-items-center mb-4">
        <div className="mb-3">
          <label htmlFor="numAros" className="form-label">Cantidad inicial de aros en A = </label>
          <input
            type="number"
            id="numAros"
            className="form-control w-25"
            onChange={handleInputChange}
            value={numAros}
          />
        </div>
        <div className="btn-group mb-4" role="group" aria-label="Control Buttons">
          <button className="btn btn-primary me-2" onClick={initCodeTowerHanoi}>Aplicar Solución</button>
          <button className="btn btn-secondary" onClick={reset}>Reiniciar</button>
        </div>
      </div>
      <div className="d-flex justify-content-between mb-4">
        <div className="text-center" onClick={movePiece} name="origin">
          <h4>ORIGEN</h4>
          <div className="torre">
            {lines.origin &&
              lines.origin.map((l, i) => l)}
          </div>
          <div className="base">█████</div>
          <h4>A</h4>
        </div>
        <div className="text-center" onClick={movePiece} name="aux">
          <h4>AUXILIAR</h4>
          <div className="torre">
            {lines.aux &&
              lines.aux.map((l, i) => l)}
          </div>
          <div className="base">█████</div>
          <h4>B</h4>
        </div>
        <div className="text-center" onClick={movePiece} name="destiny">
          <h4>DESTINO</h4>
          <div className="torre">
            {lines.destiny &&
              lines.destiny.map((l, i) => l)}
          </div>
          <div className="base">█████</div>
          <h4>C</h4>
        </div>
      </div>
      <div className="text-center mb-4">
        <h4 style={{ color: "rgb(43, 70, 146)" }}>Has realizado « {count} » pasos</h4>
        <h3>SOLUCIÓN</h3>
        <h4>La cantidad de pasos son: {steps}</h4>
        <div className="steps">
          {Object.keys(objSolution).length !== 0 ? (
            Object.keys(objSolution).map((s, i) => (
              <div key={i} className="solution">
                <p>Paso {s}</p>
                <h4>Mover {objSolution[s]}</h4>
              </div>
            ))
          ) : (
            <div className="solution">
              <p></p>
              <h4></h4>
            </div>
          )}
        </div>
      </div>
      <footer className="text-center mt-5">
        <p>
          Se cuenta una historia sobre un templo en la India en Kashi Vishwanath que contiene una gran sala con tres postes gastados por el tiempo, rodeada de 100 discos dorados. Los sacerdotes de Brahma, actuando bajo el mandato de una antigua profecía, han estado moviendo estos discos de acuerdo con las reglas inmutables de Brahma desde ese momento.
        </p>
        <p>
          Por lo tanto, el acertijo también se conoce como el rompecabezas de la Torre de Brahma. Según la leyenda, cuando se complete el último movimiento del rompecabezas, el mundo se terminará.
        </p>
        <h4 style={{ fontWeight: "800", color: "#3f246f" }}>
          Code en: <a href="https://github.com/HX-MLuquez/tower_of_hanoi-in-javascript-" target="_blank" rel="noopener noreferrer">https://github.com/HX-MLuquez/tower_of_hanoi-in-javascript-</a>
        </h4>
      </footer>
    </div>
  );
};

export default App;










// import React, { useState } from "react";
// import "./App.css";
// import code_tower_hanoi from "./utils/code_tower_hanoi";

// const App = () => {
//   const [count, setCount] = useState(0);
//   const [numAros, setNumAros] = useState(0);

//   const [steps, setSteps] = useState(0);
//   const [objSolution, setObjSolution] = useState({});
//   const [clickOnOff, setClickOnOff] = useState(false);
//   const [firstMove, setFirstMove] = useState("");
//   const [finish, setFinish] = useState(false);

//   const [lines, setLines] = useState({
//     origin: [],
//     aux: [],
//     destiny: [],
//   });

//   const handleInputChange = (event) => {
//     const num = parseInt(event.target.value);
//     setNumAros(isNaN(num) ? 0 : num);
//     renderAros(num);
//     setSteps(2 ** num - 1);
//   };
//   function crearArrayConCantidadDeElementos(cantidad) {
//     let array = [];
//     for (let i = 0; i < cantidad; i++) {
//       array.push(i);
//     }
//     return array;
//   }
//   const renderAros = (num) => {
//     const aros = [];
//     var cant = 1;
//     var result = 0;
//     for (let i = 0; i < num; i++) {
//       result = crearArrayConCantidadDeElementos(cant + i);
//       aros.push(
//         <div className="aro" key={i}>
//           {result.map((e, i) => {
//             return "▄";
//           })}
//         </div>
//       );
//       cant++;
//     }

//     setLines((l) => {
//       return {
//         ...l,
//         origin: aros,
//       };
//     });
//     return;
//   };

//   function initCodeTowerHanoi() {
//     if (Object.keys(objSolution).length > 0) {
//       alert(
//         "El juego ya se ha iniciado \n Si quieres iniciar de nuevo primero selecciona 'Reiniciar'"
//       );
//       return;
//     }
//     const result = code_tower_hanoi(numAros, "A", "B", "C");

//     setObjSolution(result);
//   }
//   function reset() {
//     setNumAros(0);
//     setLines({
//       origin: [],
//       aux: [],
//       destiny: [],
//     });
//     setSteps(0);
//     setObjSolution({});
//     setFinish(false);
//     setCount(0);
//     setFirstMove("");
//     setClickOnOff(false);
//     return;
//   }

//   function movePiece(e) {
//     if (finish)
//       return alert(
//         `Felicidades!!!! Lo has conseguido en ${count} pasos!!! \n Si quieres volver a jugar selecciona 'Reiniciar'`
//       );
//     const move = e.currentTarget.getAttribute("name");

//     if (!clickOnOff) {
//       if (lines[move].length === 0)
//         return alert(`Esta columna ${move} no contiene ningún aro`);
//       setFirstMove(move);
//       setClickOnOff(true);
//     } else {
//       // console.log("first move --> ",lines[firstMove].length !== 0 &&lines[firstMove][0].props.children);
//       // console.log("second move --> ",lines[move].length !== 0 &&lines[move][0].props.children);
//       if (firstMove === move) {
//       } else if (
//         lines[move].length === 0 ||
//         lines[move][0].props.children.length >
//           lines[firstMove][0].props.children.length
//       ) {
//         var newLines = [...lines[firstMove]];
//         var piece = newLines.shift();
//         setLines((l) => {
//           return {
//             ...l,
//             [firstMove]: newLines,
//             [move]: [piece, ...l[move]],
//           };
//         });
//         setCount((num) => num + 1);
//         if (move === "destiny" && lines[move].length + 1 === numAros) {
//           setFinish(true);
//           alert(
//             `Felicidades!!!! Lo has conseguido en ${
//               count + 1
//             } pasos!!! \n Si quieres volver a jugar selecciona 'Reiniciar'`
//           );
//           return;
//         }
//       } else {
//         alert(
//           "La pieza seleccionada no puede ser mayor a la que se encuentra donde alojar"
//         );
//         return;
//       }

//       setFirstMove("");
//       setClickOnOff(false);
//     }
//   }
//   return (
//     <div className="app">
//       <div className="header">
//         <h1>TORRE DE HANOI en JS</h1>
//       </div>
//       <div className="in">
//         <div>
//           <label htmlFor="numAros">Cantidad inicial de aros en A = </label>
//           <input
//             type="number"
//             id="numAros"
//             onChange={handleInputChange}
//             value={numAros}
//           />
//         </div>
//         <button onClick={initCodeTowerHanoi}>Aplicar Solución</button>
//         <button onClick={reset}>Reiniciar</button>
//       </div>
//       <div className="container">
//         <div className="box zthin"></div>
//         <div className="box center" onClick={movePiece} name="origin">
//           <h4>ORIGEN</h4>
//           <div className="torre">
//             {lines.origin &&
//               lines.origin.map((l, i) => {
//                 return l;
//               })}
//           </div>
//           <div key={"100"}>█████</div>
//           <h4>A</h4>
//         </div>
//         <div className="box center" onClick={movePiece} name="aux">
//           <h4>AUXILIAR</h4>
//           {lines.aux &&
//             lines.aux.map((l, i) => {
//               return <div key={i}>{l}</div>;
//             })}

//           <div key={"101"}>█████</div>
//           <h4>B</h4>
//         </div>
//         <div className="box center" onClick={movePiece} name="destiny">
//           <h4>DESTINO</h4>
//           {lines.destiny &&
//             lines.destiny.map((l, i) => {
//               return <div key={i}>{l}</div>;
//             })}

//           <div key={"102"}>█████</div>
//           <h4>C</h4>
//         </div>
//         <div className="box wide">
//           <h4 style={{"color": "rgb(43, 70, 146)"}}>Has realizado « {count} » pasos</h4>
//           <h3>SOLUCIÓN</h3>
//           <h4>La cantidad de pasos son: {steps}</h4>
//           <div className="steps">
//             {Object.keys(objSolution).length !== 0 ? (
//               Object.keys(objSolution)?.map((s, i) => {
//                 console.log("in map");
//                 return (
//                   <div key={i} className="solution">
//                     <p>Paso {s}</p>
//                     <h4>Mover {objSolution[s]}</h4>
//                   </div>
//                 );
//               })
//             ) : (
//               <div key={"i"} className="solution">
//                 <p></p>
//                 <h4></h4>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="box ythin"></div>
//       </div>
//       <div className="footera">
//         <div className="row">
//           <p>
//             Se cuenta una historia sobre un templo en la India en Kashi
//             Vishwanath que contiene una gran sala con tres postes gastados por
//             el tiempo, rodeada de 100 discos dorados. Los sacerdotes de Brahma,
//             actuando bajo el mandato de una antigua profecía, han estado
//             moviendo estos discos de acuerdo con las reglas inmutables de Brahma
//             desde ese momento.
//           </p>

//           <p>
//             Por lo tanto, el acertijo también se conoce como el rompecabezas de
//             la Torre de Brahma. Según la leyenda, cuando se complete el último
//             movimiento del rompecabezas, el mundo se terminará.
//           </p>
//           <h4 style={{"font-weight": "800", "color": "#3f246f"}}>
//             Code en: https://github.com/HX-MLuquez/tower_of_hanoi-in-javascript-
//           </h4>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


return (
  <>
    <div className="container mt-5">
      {/* Header */}
      <div className="row d-none d-md-block mb-4">
        <div className="col">
          <div className="h-100 p-3 text-white bg-dark rounded-1">
            <a className="nav-link active text-white" aria-current="page" href="{% url 'home' %}">
              <h2>Torre de HANOI</h2>
            </a>
            <p>
              Juego creado con JS, que puedes encontrar las soluciones (el paso a paso) y el camino más corto para lograr pasar todos los aros a la última columna (destino).
            </p>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="d-flex flex-column align-items-center mb-4">
        <div className="mb-3">
          <label htmlFor="numAros" className="form-label">
            Cantidad Aros
          </label>
          <input
            type="number"
            id="numAros"
            className="form-control w-25"
            onChange={handleInputChange}
            value={numAros}
            style={{ padding: "8px" }}
          />
        </div>
        <div className="btn-group mb-4" role="group" aria-label="Control Buttons">
          <button className="btn btn-primary me-2" onClick={initCodeTowerHanoi}>
            Aplicar Solución
          </button>
          <button className="btn btn-secondary" onClick={reset}>
            Reiniciar
          </button>
        </div>
      </div>
      
      {/* Towers */}
      <div className="container">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="border rounded p-3 bg-light d-flex flex-column align-items-center">
              <h4>ORIGEN</h4>
              <div className="torre">
                {lines.origin && lines.origin.map((l, i) => (
                  <div key={i} style={{ backgroundColor: 'yellow', padding: '5px', margin: '2px' }}>
                    {l}
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: 'yellow', padding: '5px' }}>█████</div>
              <h4>A</h4>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="border rounded p-3 bg-light d-flex flex-column align-items-center">
              <h4>AUXILIAR</h4>
              <div className="torre">
                {lines.aux && lines.aux.map((l, i) => (
                  <div key={i} style={{ backgroundColor: 'yellow', padding: '5px', margin: '2px' }}>
                    {l}
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: 'yellow', padding: '5px' }}>█████</div>
              <h4>B</h4>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="border rounded p-3 bg-light d-flex flex-column align-items-center">
              <h4>DESTINO</h4>
              <div className="torre">
                {lines.destiny && lines.destiny.map((l, i) => (
                  <div key={i} style={{ backgroundColor: 'yellow', padding: '5px', margin: '2px' }}>
                    {l}
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: 'yellow', padding: '5px' }}>█████</div>
              <h4>C</h4>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-4">
          <h4 className="text-primary">Realizaste « {count} » pasos</h4>
        </div>
      </div>
      
      {/* Sidebar Solution */}
      <div className="position-fixed top-0 end-0 p-3" style={{ width: '300px', height: '100vh', overflowY: 'auto', backgroundColor: '#f8f9fa', borderLeft: '2px solid #dee2e6', boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.1)' }}>
        <h3 className="text-primary">SOLUCIÓN</h3>
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
    
    {/* Footer */}
    <div className="container mt-5">
      <div className="col text-center bg-secondary p-2 text-white" style={{ color: "gray" }}>
        <p>
          Se cuenta una historia sobre un templo en la India en Kashi Vishwanath que contiene una gran sala con tres postes gastados por el tiempo, rodeada de 100 discos dorados. Los sacerdotes de Brahma, actuando bajo el mandato de una antigua profecía, han estado moviendo estos discos de acuerdo con las reglas inmutables de Brahma desde ese momento.
        </p>
        <p>
          Por lo tanto, el acertijo también se conoce como el rompecabezas de la Torre de Brahma. Según la leyenda, cuando se complete el último movimiento del rompecabezas, el mundo se terminará.
        </p>
        <a href="https://github.com/HX-MLuquez/tower_of_hanoi-in-javascript-" target="_blank" className="text-white">
          <h4 style={{ fontWeight: '800', color: '#3f246f' }}>Code in GitHub</h4>
        </a>
      </div>
    </div>
  </>
);
};