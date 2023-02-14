
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
  
// real-time listener: onSnapshot (takes an callback function as a arguments)
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
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();
  
  const medication = {
    name: form.name.value,
    number_of_pills: form.number_of_pills.value,
    deposit_number: form.deposit_number.value
  };

  db.collection('medication').add(medication)
    .catch(err => console.log(err));
    
    
  form.name.value = '';
  form.number_of_pills.value = '';
  form.deposit_number.value = '';
  
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