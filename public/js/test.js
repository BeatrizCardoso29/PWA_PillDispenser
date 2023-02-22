const fileInput = document.getElementById('photo');
const fileName = document.querySelector('.file-name');

fileInput.addEventListener('change', function() {
  fileName.textContent = this.files[0].name;
});

const passwordInput = document.getElementById('password');
const passwordToggleBtn = document.querySelector('.password-toggle-btn');

passwordToggleBtn.addEventListener('click', () => {
  const pressed = passwordToggleBtn.getAttribute('aria-pressed') === 'true' || false;
  passwordToggleBtn.setAttribute('aria-pressed', !pressed);
  if (pressed) {
    passwordInput.type = 'password';
  } else {
    passwordInput.type = 'text';
  }
});



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
    }
    if(change.type === 'removed'){
    }
  });
});

//add new user
const form_user = document.querySelector('.add-user');
form_user.addEventListener('submit', evt => {
  evt.preventDefault();

  const userEmail = form_user.email.value;

  // Verificar se o email já existe
  db.collection('user').where('email', '==', userEmail).get()
    .then(snapshot => {
      if (snapshot.empty) {
        // O email não existe, então adiciona o novo usuário
        const user = {
          username: form_user.username.value,
          email: userEmail,
          password: form_user.password.value,
          photo: form_user.photo.value,
          pathology: form_user.pathology.value
        };

        db.collection('user').add(user)
          .then(() => {
            form_user.reset();
            window.location.href = "/public/pages/main.html?email=" + userEmail;
          })
          .catch(err => console.log(err));
      } else {
        // O email já existe, então exibe uma mensagem de erro
        const errorMessage = document.getElementById('error-email');
        errorMessage.innerHTML = 'Este email já está sendo usado. Por favor, insira outro.';
        errorMessage.style.color = 'black';
        errorMessage.style.fontSize = '12px';
            }
    })
    .catch(err => console.log(err));
});


// log in user
const form_login = document.querySelector('.login-user');
form_login.addEventListener('submit', evt => {
  evt.preventDefault();

  const email = form_login.email.value;
  const password = form_login.password.value;
  
  db.collection('user').where('email', '==', email).get()
  .then(snapshot => {
    if (snapshot.empty) {
        const errorMessage = document.getElementById('error-email2');
        errorMessage.innerHTML = 'Email não encontrado. Por favor, insira outro.';
        errorMessage.style.color = 'black';
        errorMessage.style.fontSize = '12px';
    }
    else{
        const user = snapshot.docs[0].data();
        if (user.password !== password) {
            const errorMessage = document.getElementById('error-password');
        errorMessage.innerHTML = 'Password Incorreta. Por favor, tente novamente.';
        errorMessage.style.color = 'black';
        errorMessage.style.fontSize = '12px';
          return;
        } 
        else{
            // redirecionar para página de medicação
            window.location.href = "/public/pages/main.html?email=" + email;

        }}
    

  })
  .catch(err => console.log(err));

form_login.reset();
  
});








