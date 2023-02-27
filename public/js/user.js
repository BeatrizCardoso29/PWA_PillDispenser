
function changeLabel() {
  document.getElementById("photo").innerHTML = "Your profile photo was saved!";
}

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

  async function addUser (){

    // Verificar se o email já existe
    db.collection('user').where('email', '==', userEmail).get()
    .then(async snapshot => {
      if (snapshot.empty) {
        // O email não existe, então adiciona o novo usuário

        const user = {
          username: form_user.username.value,
          email: userEmail,
          password: form_user.password.value,
          pathology: form_user.pathology.value,
          created:firestore, 
          alert_time: form_user.alert_time.value
        };

        async function getLastUserId() {
          const docRef = db.collection('user').orderBy('created', 'desc').limit(1);
          console.log(docRef)
          let lastUser = 0;

          try {
            const doc = await docRef.get();
            console.log(doc)
            if (!doc.empty) {
              lastUser = doc.docs[0].id;
              console.log(lastUser)
            } else {
              console.log('Não há documentos na coleção.');
            }
          } catch (error) {
            console.log('Erro ao buscar documentos: ', error);
          }

          const nextId = parseInt(lastUser) + 1;
          console.log(nextId)
          const nextIdToString = nextId.toString();
          console.log(nextIdToString)

          var info = db.collection("info").doc("1");

          info.get().then((doc) => {
            info.update({
              totalUsers: doc.data().totalUsers + 1
          })
          .then(() => {
              console.log("Documento atualizado com sucesso!");
          })
          .catch((error) => {
              console.error("Erro ao atualizar documento: ", error);
          });
        });
  
          db.collection('user').doc(nextIdToString).set(user).then((e) => {
            form_user.reset();
                window.location.href = "/public/pages/main.html?id=" + nextIdToString;
          })
          .catch(err => console.log(err))
                
        }

        getLastUserId()

      } else {
        // O email já existe, então exibe uma mensagem de erro
        const errorMessage = document.getElementById('error-email');

        errorMessage.innerHTML = 'Este email já está sendo usado. Por favor, insira outro.';
        errorMessage.style.color = 'black';
        errorMessage.style.fontSize = '12px';
            }

    })
    .catch(err => console.log(err));
      }

  addUser()
 
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
          const docRef = db.collection('user').where('email', '==', email);
          docRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              window.location.href = "/public/pages/main.html?id=" + doc.id;
            });
          });
        }
    }
  })
  .catch(err => console.log(err));
  form_login.reset();


});








