
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
      console.log(change.doc.data()); 
      console.log("test"); 
      renderUser(change.doc.data(), change.doc.id);
    }
    if(change.type === 'removed'){
      removeUser(change.doc.id);
    }
  });
});

// add new user
const form_user = document.querySelector('.add-user');
form_user.addEventListener('submit', evt => {
  evt.preventDefault();
  
  const user = {
    username: form_user.username.value,
    email: form_user.email.value,
    password: form_user.password.value,
    photo: form_user.photo.value,
    pathology: form_user.pathology.value
  };


  db.collection('user').add(user)
    .catch(err => console.log(err));
    
    
    form_user.username.value = '';
    form_user.email.value = '';
    form_user.password.value = '';
    form_user.pathology.value = '';
    form_user.photo.value = '';
  
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

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add user form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

// render user data
const renderUser = (data, id) => {
  
  

  const html = `
    <div class="card-panel user white row" data-id="${id}">
      <img src="/public//img/pill.png" alt="user thumb">
      <div class="user-details">
      <div class="user-email">${data.email}</div>
        <div class="user-username">${data.username}</div>
        <div class="user-password">${data.password}</div>
        <div class="user-pathology">${data.pathology}</div>
        <div class="user-photo">${data.photo}</div>
      
      </div>
      <div class="user-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;

  user.innerHTML += html;

};

// remove user
const removeUser = (id) => {
  const user = document.querySelector(`.user[data-id=${id}]`);
  user.remove();
};