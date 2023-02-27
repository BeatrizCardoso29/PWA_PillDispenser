
// // enable offline data
// db.enablePersistence()
//   .catch(function(err) {
//     if (err.code == 'failed-precondition') {
//       // probably multible tabs open at once
//       console.log('persistance failed');
//     } else if (err.code == 'unimplemented') {
//       // lack of browser support for the feature
//       console.log('persistance not available');
//     }
//   });
  
db.collection('medication').onSnapshot(snapshot => {
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
      console.log(change.type, change.doc.id, change.doc.data());
      if(change.type === 'added'){
        renderMed(change.doc.data(), change.doc.id);
      }
      if(change.type === 'removed'){
        removeMedication(change.doc.id);
      }
    });
  });

// add new medication
const form_medication = document.querySelector('.add-medication');
form_medication.addEventListener('submit', evt => {
  evt.preventDefault();
  
  const medication = {
    pill_name: form_medication.pill_name.value,
    number_of_pills: form_medication.number_of_pills.value,
    deposit_number: form_medication.deposit_number.value
  };

  db.collection('medication').add(medication)
    .catch(err => console.log(err));
    
    
  form_medication.pill_name.value = '';
  form_medication.number_of_pills.value = '';
  form_medication.deposit_number.value = '';

});

// remove medication
const medicationContainer = document.querySelector('.medication');
medicationContainer.addEventListener('click', evt => {
  console.log(evt);
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id');
    //console.log(id);
    db.collection('medication').doc(id).delete();
  }
})

const medication = document.querySelector('.medication');

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add medication form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

// render medication data
const renderMed = (data, id) => {

  const html = `
    <div class="card-panel medication white row" data-id="${id}">
      <img src="/public//img/pill.png" alt="medication thumb">
      <div class="medication-details">
        <div class="medication-title">${data.pill_name}</div>
        <div class="medication-number_of_pills">${data.number_of_pills}</div>
        <div class="medication-deposit_number">${data.deposit_number}</div>
      </div>
      <div class="medication-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;

  console.log(medication);
  medication.innerHTML += html;

};

// remove medication
const removeMedication = (id) => {
  const med = document.querySelector(`.medication[data-id=${id}]`);
  med.remove();
};