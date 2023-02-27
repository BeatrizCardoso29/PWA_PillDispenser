

const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', options);
document.getElementById('date-display').textContent = formattedDate;


// enable offline data
db.enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

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

const urlParams = new URLSearchParams(window.location.search);
const userEmail = urlParams.get('email');
console.log(userEmail);

db.collection('user').where('email', '==', userEmail).get()
  .then(snapshot => {
    if (snapshot.empty) {
      // Usuário não encontrado
    } else {
      // Obter os dados do usuário
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

  //STOCK
db.collection('stock').onSnapshot(snapshot => {
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
      console.log(change.type, change.doc.id, change.doc.data());
      if(change.type === 'added'){
        renderstock(change.doc.data(), change.doc.id);
      }
      if(change.type === 'removed'){
        removestock(change.doc.id);
      }
    });
  });

// add new stock
const form_stock = document.querySelector('.add-stock');
form_stock.addEventListener('submit', evt => {
  evt.preventDefault();
  const stock = {
    pill_name: form_stock.pill_name.value,
    qtd: form_stock.qtd.value,
    deposit: form_stock.deposit.value
  };

  db.collection('stock').add(stock)
    .catch(err => console.log(err));
    
    
  form_stock.pill_name.value = '';
  form_stock.qtd.value = '';
  form_stock.deposit.value = '';

  // Fecha o side-form
  const instance = M.Sidenav.getInstance(document.querySelector('.side-form_stock'));
  instance.close();
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

// render stock data
const renderstock = (data, id) => {

};

// remove stock
const removestock = (id) => {
  const stock_out = document.querySelector(`.stock[data-id=${id}]`);
  stock_out.remove();
};


//MEDICATION

const finiteDurationCheckbox = document.getElementById('finite_duration');
const endDateContainer = document.getElementById('end-date-container');

finiteDurationCheckbox.addEventListener('change', () => {
  if (finiteDurationCheckbox.checked) {
    endDateContainer.style.display = 'block';
  } else {
    endDateContainer.style.display = 'none';
  }
});
