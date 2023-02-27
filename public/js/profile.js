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

db.collection('user').onSnapshot(snapshot => {
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
      console.log(change.type, change.doc.id, change.doc.data());
      if(change.type === 'added'){
        renderUser(change.doc.data(), change.doc.id);
      }
      if(change.type === 'removed'){
        removeUser(change.doc.id);
      }
    });
  });


// remove user
const userContainer = document.querySelector('.user');
userContainer.addEventListener('click', evt => {
  console.log(evt);
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id');
    //console.log(id);
    db.collection('user').doc(id).delete();
  }
})

const  user = document.querySelector('.user');

// remove user
const removeUser = (id) => {
  const user = document.querySelector(`.user[data-id=${id}]`);
  user.remove();
};


