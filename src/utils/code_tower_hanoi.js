function code_tower_hanoi(n, origen, auxiliar, destino) {
  let results = [];
  tower_hanoi(n, origen, auxiliar, destino);
  function tower_hanoi(n, origen, auxiliar, destino) {
    if (n == 1) {
      results.push(`${origen} -> ${destino}`);
    } else {
      tower_hanoi(n - 1, origen, destino, auxiliar);
      results.push(`${origen} -> ${destino}`);
      // línea 3
      tower_hanoi(n - 1, auxiliar, origen, destino);
    }
  }
  let obj_results = {};
  for (let i = 0; i < results.length; i++) {
    obj_results[i + 1] = results[i];
  }
  console.log(obj_results);
  return obj_results;
}

// code_tower_hanoi(9, "A", "B", "C");
export default code_tower_hanoi;
