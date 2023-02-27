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
  
db.collection('stock').onSnapshot(snapshot => {
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
      console.log(change.type, change.doc.id, change.doc.data());
      if(change.type === 'added'){
        console.log("2");
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
  console.log("2");
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
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

// render stock data
const renderstock = (data, id) => {

  console.log("3");
  const html = `
    <div class="card-panel stock white row" data-id="${id}">
      <img src="/public//img/pill.png" alt="stock thumb">
      <div class="stock-details">
        <div class="stock-pill_name">${data.pill_name}</div>
        <div class="stock-qtd">${data.qtd}</div>
        <div class="stock-deposit">${data.deposit}</div>
      </div>
      <div class="stock-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;

  console.log(stock);
  stock.innerHTML += html;

};

// remove stock
const removestock = (id) => {
  const stock_out = document.querySelector(`.stock[data-id=${id}]`);
  stock_out.remove();
};