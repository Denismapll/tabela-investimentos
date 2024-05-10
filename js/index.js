const alta = document.querySelectorAll(".emalta");
const baixa = document.querySelectorAll(".embaixa");
const botoes = document.querySelectorAll(".buttons");
const setores = document.querySelectorAll(".setores");
const dolar = document.querySelector(".dolar");
const valueBlock = document.querySelectorAll(".value-block");
const percent = document.querySelectorAll(".percent");

const fetchAlta = (sector) => {
  const result = fetch(
    `https://brapi.dev/api/quote/list?&sortBy=change&sortOrder=desc&limit=10&sector=${sector}&type=stock&token=eJGEyu8vVHctULdVdHYzQd`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      return data.stocks;
    });
  return result;
};

const fetchBaixa = (sector) => {
  const result = fetch(
    `https://brapi.dev/api/quote/list?&sortBy=change&sortOrder=asc&limit=10&sector=${sector}&type=stock&token=eJGEyu8vVHctULdVdHYzQd`
  )
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data)
      return data.stocks;
    });
  return result;
};

const fetchDEB = () => {
  const result = fetch(
    `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,CNY-BRL,BTC-BRL,ETH-BRL`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.USDBRL)
      return data;
    });
  return result;
};

// ROTATIVO

async function attRotativo() {
  res = await fetchDEB();

  percent.forEach((x) => {
    x.textContent = parseFloat(res[x.classList[1]].pctChange) + "%";

    if (parseFloat(res[x.classList[1]].pctChange) < 0) {
      x.classList.add("red");
    } else {
      x.classList.add("green");
    }
  });

  valueBlock.forEach((x) => {
    console.log(x.classList[1]);

    x.textContent = parseFloat(res[x.classList[1]].ask).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
  });

  completarRotativo();
}

function completarRotativo() {
  const conteudo = document.querySelector(".interno-rotativo.d-flex.flex-row");
  const rotativos = Array.from(conteudo.children);

  rotativos.forEach((item) => {
    const duplicados = item.cloneNode(true);
    duplicados.setAttribute("aria-hidden", true);
    conteudo.appendChild(duplicados);
  });
}

async function dolarValue() {
  res = await fetchDEB();
  console.log(res);
  dolar.value = res.USDBRL.bid;
  dolar.textContent = parseFloat(res.USDBRL.bid).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const attDolar = setInterval(() => {
  dolarValue();
}, 10000);
// fetchAlta('finance');

async function changeTable(sector) {
  const resultA = await fetchAlta(sector);
  const resultB = await fetchBaixa(sector);

  const filterAr = [];

  // console.log(resultA)

  resultA.forEach((el) => {
    if (el.stock.length == 5) {
      //   filterAr.push(el);
    }
  });

  //   console.log(filterAr)

  alta.forEach((x, y) => {
    try {
      x.children[0].children[0].src = resultA[y].logo;
      x.children[1].textContent = resultA[y].stock;
      x.children[2].textContent = resultA[y].name;
      x.children[3].textContent = resultA[y].close.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      x.children[4].textContent =
        parseFloat(resultA[y].change).toFixed(2) + "%";
      x.children[4].value = parseFloat(resultA[y].change);
      checkVar(x.children[4]);
      x.children[5].textContent = resultA[y].sector;
    } catch (error) {
      x.children[0].children[0].src = "";
      x.children[1].textContent = "";
      x.children[2].textContent = "";
      x.children[3].textContent = "";
      x.children[4].textContent = "";
      x.children[5].textContent = "";
    }
  });

  baixa.forEach((x, y) => {
    try {
      x.children[0].children[0].src = resultB[y].logo;
      x.children[1].textContent = resultB[y].stock;
      x.children[2].textContent = resultB[y].name;
      x.children[3].textContent = resultB[y].close.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      x.children[4].textContent =
        parseFloat(resultB[y].change).toFixed(2) + "%";
      x.children[4].value = parseFloat(resultB[y].change);
      checkVar(x.children[4]);
      x.children[5].textContent = resultB[y].sector;
    } catch (error) {
      x.children[0].children[0].src = "";
      x.children[1].textContent = "";
      x.children[2].textContent = "";
      x.children[3].textContent = "";
      x.children[4].textContent = "";
      x.children[5].textContent = "";
    }
  });
}

function checkVar(valor) {
  if (valor.value > 0) {
    valor.parentElement.classList.add("table-success");
    valor.parentElement.classList.remove("table-danger");
  }
  if (valor.value < 0) {
    valor.parentElement.classList.add("table-danger");
    valor.parentElement.classList.remove("table-success");
  }
}

setores.forEach((x) => {
  x.addEventListener("click", (x) => {
    changeTable(x.target.value);
  });
});

// console.log(baixa)

changeTable("Electronic Technology");

attRotativo();

dolarValue();
