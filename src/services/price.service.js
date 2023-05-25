export default function updateTotal(e) {
    let value = 0;
    for (let i = 0; i < e.length; i++) {
      if (e[i].type === "income") {
        e[i].cost = +e[i].cost;
        value += e[i].cost;
      } else if (e[i].type === "expense") {
        e[i].cost = +e[i].cost;
        value = value - e[i].cost;
      }
    }
    return value
  }