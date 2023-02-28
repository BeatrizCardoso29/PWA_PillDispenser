
//switch content
const botao1 = document.getElementById("botao1");
const botao2 = document.getElementById("botao2");

botao1.addEventListener("click", function() {
    window.location.href = "/public/pages/main.html?id=" + userId; // troque o nome da página que deseja abrir
  });
  
  botao2.addEventListener("click", function() {
    window.location.href = "/public/pages/stock.html?id=" + userId; // troque o nome da página que deseja abrir
  });

//switch deposit
// seleciona todos os botões

const circleContainer = document.getElementById("circle-container");
// Cria os elementos de conteúdo dinamicamente

// 1
const content1 = document.createElement("div");
content1.id = "button1-content";
content1.classList.add("content1");

// supondo que o id do documento que você deseja verificar seja "doc1"
const docRef1 = db.collection("stock").doc("1");
console.log(docRef1)

docRef1.get().then((doc) => {
  if (doc.exists) {
    // o documento existe, crie o conteúdo dinâmico com os dados do documento
    const data = doc.data();
    const id = doc.id;

    content1.innerHTML = `
    <div class="card-panel stock white row" data-id="${id}">
          <div class="stock-deposit">${data.deposit}</div>
          <div class="stock-details">
            <div class="stock-pill_name">${data.pill_name}</div>
            <div class="stock-qtd"> Number of pills: ${data.qtd}</div>
          </div>
          <div class="stock-delete">
            <i class="material-icons" data-id="${id}">delete_outline</i>
          </div>
        </div>
`;

  } else {
    // o documento não existe, exiba a mensagem "deposito vazio"
    content1.innerHTML = `
    <div class="card-panel stock white row">
    <p> Deposit Available. </p>
    </div>
    `;

  }
}).catch((error) => {
  console.error("Erro ao obter o documento:", error);
});

// 2
const content2 = document.createElement("div");
content2.id = "button2-content";
// supondo que o id do documento que você deseja verificar seja "doc1"
const docRef2 = db.collection("stock").doc("2");
console.log(docRef2)

docRef2.get().then((doc) => {
  if (doc.exists) {
    // o documento existe, crie o conteúdo dinâmico com os dados do documento
    const data = doc.data();
    const id = doc.id;

    content2.innerHTML = `
    <div class="card-panel stock white row" data-id="${id}">
          <div class="stock-deposit">${data.deposit}</div>
          <div class="stock-details">
            <div class="stock-pill_name">${data.pill_name}</div>
            <div class="stock-qtd"> Number of pills: ${data.qtd}</div>
          </div>
          <div class="stock-delete">
            <i class="material-icons" data-id="${id}">delete_outline</i>
          </div>
        </div>
`;

  } else {
    // o documento não existe, exiba a mensagem "deposito vazio"
    content2.innerHTML = `
    <div class="card-panel stock white row">
    <p> Deposit Available. </p>
    </div>
    `;

  }
}).catch((error) => {
  console.error("Erro ao obter o documento:", error);
});

// 3
const content3 = document.createElement("div");
content3.id = "button3-content";
// supondo que o id do documento que você deseja verificar seja "doc1"
const docRef3 = db.collection("stock").doc("3");
console.log(docRef3)

docRef3.get().then((doc) => {
  if (doc.exists) {
    // o documento existe, crie o conteúdo dinâmico com os dados do documento
    const data = doc.data();
    const id = doc.id;

    content3.innerHTML = `
    <div class="card-panel stock white row" data-id="${id}">
          <div class="stock-deposit">${data.deposit}</div>
          <div class="stock-details">
            <div class="stock-pill_name">${data.pill_name}</div>
            <div class="stock-qtd"> Number of pills: ${data.qtd}</div>
          </div>
          <div class="stock-delete">
            <i class="material-icons" data-id="${id}">delete_outline</i>
          </div>
        </div>
`;

  } else {
    // o documento não existe, exiba a mensagem "deposito vazio"
    content3.innerHTML = `
    <div class="card-panel stock white row">
    <p> Deposit Available. </p>
    </div>
    `;

  }
}).catch((error) => {
  console.error("Erro ao obter o documento:", error);
});

// 4
const content4 = document.createElement("div");
content4.id = "button4-content";
// supondo que o id do documento que você deseja verificar seja "doc1"
const docRef4 = db.collection("stock").doc("4");
console.log(docRef4)

docRef4.get().then((doc) => {
  if (doc.exists) {
    // o documento existe, crie o conteúdo dinâmico com os dados do documento
    const data = doc.data();
    const id = doc.id;

    content4.innerHTML = `
    <div class="card-panel stock white row" data-id="${id}">
          <div class="stock-deposit">${data.deposit}</div>
          <div class="stock-details">
            <div class="stock-pill_name">${data.pill_name}</div>
            <div class="stock-qtd"> Number of pills: ${data.qtd}</div>
          </div>
          <div class="stock-delete">
            <i class="material-icons" data-id="${id}">delete_outline</i>
          </div>
        </div>
`;

  } else {
    // o documento não existe, exiba a mensagem "deposito vazio"
    content4.innerHTML = `
    <div class="card-panel stock white row">
    <p> Deposit Available. </p>
    </div>
    `;

  }
}).catch((error) => {
  console.error("Erro ao obter o documento:", error);
});

// 5
const content5 = document.createElement("div");
content5.id = "button5-content";
// supondo que o id do documento que você deseja verificar seja "doc1"
const docRef5 = db.collection("stock").doc("5");
console.log(docRef5)

docRef5.get().then((doc) => {
  if (doc.exists) {
    // o documento existe, crie o conteúdo dinâmico com os dados do documento
    const data = doc.data();
    const id = doc.id;

    content5innerHTML = `
    <div class="card-panel stock white row" data-id="${id}">
          <div class="stock-deposit">${data.deposit}</div>
          <div class="stock-details">
            <div class="stock-pill_name">${data.pill_name}</div>
            <div class="stock-qtd"> Number of pills: ${data.qtd}</div>
          </div>
          <div class="stock-delete">
            <i class="material-icons" data-id="${id}">delete_outline</i>
          </div>
        </div>
`;

  } else {
    // o documento não existe, exiba a mensagem "deposito vazio"
    content5.innerHTML = `
    <div class="card-panel stock white row">
    <p> Deposit Available. </p>
    </div>
    `;

  }
}).catch((error) => {
  console.error("Erro ao obter o documento:", error);
});

// 6
const content6 = document.createElement("div");
content6.id = "button6-content";
// supondo que o id do documento que você deseja verificar seja "doc1"
const docRef6 = db.collection("stock").doc("6");
console.log(docRef6)

docRef6.get().then((doc) => {
  if (doc.exists) {
    // o documento existe, crie o conteúdo dinâmico com os dados do documento
    const data = doc.data();
    const id = doc.id;

    content6.innerHTML = `
    <div class="card-panel stock white row" data-id="${id}">
          <div class="stock-deposit">${data.deposit}</div>
          <div class="stock-details">
            <div class="stock-pill_name">${data.pill_name}</div>
            <div class="stock-qtd"> Number of pills: ${data.qtd}</div>
          </div>
          <div class="stock-delete">
            <i class="material-icons" data-id="${id}">delete_outline</i>
          </div>
        </div>
`;

  } else {
    // o documento não existe, exiba a mensagem "deposito vazio"
    content6.innerHTML = `
    <div class="card-panel stock white row">
    <p> Deposit Available. </p>
    </div>
    `;

  }
}).catch((error) => {
  console.error("Erro ao obter o documento:", error);
});

// Adiciona os elementos de conteúdo ao container
circleContainer.appendChild(content1);
circleContainer.appendChild(content2);
circleContainer.appendChild(content3);
circleContainer.appendChild(content4);
circleContainer.appendChild(content5);
circleContainer.appendChild(content6);

// selecione todos os botões
const buttons = document.querySelectorAll("#circle-container button");

// selecione todos os conteúdos
const contents = document.querySelectorAll("#circle-container > div:not(.center)");

// mostra o conteúdo do botão 1 por padrão
contents.forEach((content) => {
  content.style.display = "none";
});
const contentDefault = document.querySelector('#button1-content');
contentDefault.style.display = "block";

// adiciona um evento de clique a cada botão
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // oculta todos os conteúdos
    contents.forEach((content) => {
      content.style.display = "none";
    });
    // mostra apenas o conteúdo correspondente ao botão clicado
    const contentToShow = document.querySelector(`#${button.id}-content`);
    contentToShow.style.display = "block";
  });
});


//------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var options = {
      edge: 'right'
    };
    var instances = M.Sidenav.init(elems, options);
  });
  
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav-trigger');
    var instances = M.Sidenav.init(elems);
});


db.collection('user').doc(userId).get()
  .then(snapshot => {
    if (snapshot.empty) {
      // User não encontrado
    } else {
      // Obter os dados do user
      const userData = snapshot.docs[0].data();
      console.log(userData);
      // Faça algo com os dados do usuário aqui
    }
  })
  .catch(error => {
    // Lidar com erros aqui
  });

  function switchContent(content) {
    var medicationContent = document.getElementById("medication-content");
    var stockContent = document.getElementById("stock-content");
    
    if (content == "medication") {
      medicationContent.style.display = "block";
      stockContent.style.display = "none";
    } else if (content == "stock") {
      medicationContent.style.display = "none";
      stockContent.style.display = "block";
    }
  }


// STOCK --------------------------------------------------------------------------

db.collection('stock').onSnapshot(snapshot => {
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
      console.log(change.type, change.doc.id, change.doc.data());
      if(change.type === 'added'){
      }
      if(change.type === 'removed'){
        removestock(change.doc.id);
      }
    });
  });

// remove stock
const removestock = (id) => {
  const stock_out = document.querySelector(`.stock[data-id=${id}]`);
  stock_out.remove();
};
  
// Referência para a coleção 'stock'
const stockRef = db.collection('stock');

document.addEventListener("DOMContentLoaded", () => {
  db.collection("stock").get().then((querySnapshot) => {
    const usedDeposits = [];
    querySnapshot.forEach((doc) => {
      usedDeposits.push(doc.data().deposit);
      console.log(usedDeposits);
    });

    const depositSelect = document.querySelector("#deposit");
    const options = depositSelect.querySelectorAll("option");
    options.forEach((option) => {
      if (usedDeposits.includes(option.value)) {
        option.remove();
      }
    });
  }).catch((error) => {
    console.error("Erro ao consultar a coleção 'stock':", error);
  });
});


// add new stock
const form_stock = document.querySelector('.add-stock');
form_stock.addEventListener('submit', evt => {
  evt.preventDefault();

  const pill_name = form_stock.pill_name.value.toLowerCase();
  const deposit = form_stock.deposit.value;

  const stock = {
    pill_name: pill_name,
    qtd: form_stock.qtd.value,
    deposit: form_stock.deposit.value
  };

  db.collection('stock').doc(deposit).set(stock).then((e) => {
    form_stock.reset();
    const instance = M.Sidenav.getInstance(document.querySelector('.side-form_stock'));
    instance.close();
  })
  .catch(err => console.log(err))

  
});


// remove stock
const stockContainer = document.querySelector('.stock');
stockContainer.addEventListener('click', evt => {
  console.log(evt);
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id');
    //console.log(id);
    db.collection('stock').doc(id).delete();
  }
})

const stock = document.querySelector('.stock');

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add stock form
  const forms = document.querySelectorAll('.side-form_stock');
  M.Sidenav.init(forms, {edge: 'left'});
});
