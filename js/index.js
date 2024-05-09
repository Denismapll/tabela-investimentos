const alta = document.querySelectorAll(".emalta");
const baixa = document.querySelectorAll(".embaixa");
const botoes = document.querySelectorAll(".buttons");
const setores = document.querySelectorAll(".setores");
const dolar = document.querySelector('.dolar');

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

const fetchDolar = () => {
  const result = fetch(
    `https://economia.awesomeapi.com.br/json/last/USD-BRL`
  ).then((res)=> res.json())
  .then((data)=>{
    // console.log(data.USDBRL)
    return data.USDBRL
  })
  return result;
}

// fetchDolar();

dolarValue();

async function dolarValue(){
  res = await fetchDolar();
  // console.log(res.ask)
  dolar.value = res.bid
  dolar.textContent = parseFloat(res.bid).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const attDolar = setInterval(()=>{
  
  dolarValue();
},10000)
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
      x.children[4].value =
        parseFloat(resultA[y].change);
        checkVar(x.children[4])
      x.children[5].textContent = resultA[y].sector;
    } catch (error) {
        x.children[0].children[0].src = ""
        x.children[1].textContent = ""
        x.children[2].textContent = ""
        x.children[3].textContent = ""
        x.children[4].textContent = ""
        x.children[5].textContent = ""
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
        x.children[4].value =
        parseFloat(resultB[y].change);
        checkVar(x.children[4])
      x.children[5].textContent = resultB[y].sector;
    } catch (error) {
        x.children[0].children[0].src = ""
        x.children[1].textContent = ""
        x.children[2].textContent = ""
        x.children[3].textContent = ""
        x.children[4].textContent = ""
        x.children[5].textContent = ""
    }
  });
}

function checkVar(valor){
    if (valor.value > 0) {
        valor.parentElement.classList.add('table-success')
        valor.parentElement.classList.remove('table-danger')
    }
    if (valor.value < 0) {
        valor.parentElement.classList.add('table-danger')
        valor.parentElement.classList.remove('table-success')
    }
}

changeTable("Electronic Technology");

setores.forEach((x) => {
  x.addEventListener("click", (x) => {
    changeTable(x.target.value);
  });
});

// console.log(baixa)
