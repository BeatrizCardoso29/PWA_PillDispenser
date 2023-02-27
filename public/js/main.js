
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
console.log(userId);

//switch content
const botao1 = document.getElementById("botao1");
const botao2 = document.getElementById("botao2");

botao1.addEventListener("click", function() {
  window.location.href = "/public/pages/main.html?id=" + userId; // troque o nome da página que deseja abrir
});

botao2.addEventListener("click", function() {
  window.location.href = "/public/pages/stock.html?id=" + userId; // troque o nome da página que deseja abrir
});

//sidenav
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

//confirmar user
db.collection('user').doc(userId).get()
  .then(snapshot => {
    if (snapshot.empty) {
      // User não encontrado
    } else {
      // Obter os dados do user
      const userData = snapshot.docs[0].data();
      console.log(userData);
    }
  })
  .catch(error => {
    // Lidar com erros aqui
  });

//MEDICATION ------------------------------------------------------------------

//end date aparece se finite duration for escolhido 

// const durationSelect = document.querySelector('#finite_duration');
// const endDateInput = document.querySelector('#end-field');

// durationSelect.addEventListener('change', () => {
//   if (durationSelect.value === 'T') {
//     endDateInput.style.display = 'block';
//     document.querySelector('#end-label').style.display = 'block';
//   } else {
//     endDateInput.style.display = 'none';
//     document.querySelector('#end-label').style.display = 'none';
//   }
// });

// render medication data

db.collection('medication').onSnapshot(snapshot => {
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
      console.log(change.type, change.doc.id, change.doc.data());
      if(change.type === 'added'){
        rendermed(change.doc.data(), change.doc.id);
      }
      if(change.type === 'removed'){
        removemed(change.doc.id);
      }
    });
  });

//add new medication 

const form_med = document.querySelector('.add-medication');
form_med.addEventListener('submit', evt => {
  evt.preventDefault();

  const pill_name = form_med.pill_name.value.toLowerCase();

  function isDateGreaterThanToday(dateString) {
    // Converte a data em string para objeto Date
    const date = new Date(dateString);
    
    // Obtemos a data atual
    const today = new Date();
    
    // Comparamos as datas ignorando a hora
    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    return date > today;
  }
  

  async function addMed (){

    // Verificar se o medicamento existe
    db.collection('stock').where('pill_name', '==', pill_name).get()
    .then(async snapshot => {
      if (snapshot.empty) {
        // O medicamente não existe, então não é possivel adicionar medication
        const errorMessage = document.getElementById('error-pname');

        errorMessage.innerHTML = 'Este medicamente não existe no seu stock. Por favor, insira outro.';
        errorMessage.style.color = 'black';
        errorMessage.style.fontSize = '12px';
      }

      else {
        const stock = snapshot.docs[0].data();
        const deposit = stock.deposit;
        const medication = {

          active: isDateGreaterThanToday(end), //function que calcula se a end date é maior do que hoje
          pill_name: pill_name, 
          deposit: deposit,
          end: form_med.end.value,
          start: form_med.start.value,
          finite_duration: form_med.finite_duration.value,
          medication_time: form_med.med_time.value,
          mode: form_med.mode.value,
          dose: form_med.dose.value,
          created:firestore,
          userId: userId
        };

        async function getLastUserId() {

          const med=db.collection('medication').get();
          console.log(med);
          const medRef = db.collection('medication').orderBy('created', 'desc').limit(1);
          console.log(medRef);

          let lastUser = 0;

          try {
            const doc = await medRef.get();
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
              totalMed: doc.data().totalMed + 1
          })
          .then(() => {
              console.log("Documento atualizado com sucesso!");
          })
          .catch((error) => {
              console.error("Erro ao atualizar documento: ", error);
          });
        });
  
          db.collection('medication').doc(nextIdToString).set(medication).then((e) => {
            form_med.reset();
            const instance = M.Sidenav.getInstance(document.querySelector('.side-form_med'));
            instance.close();
          })
          .catch(err => console.log(err))
                
        }

        getLastUserId()
    
      }

    })
    .catch(err => console.log(err));
    
  }

  addMed();
 
});

const medContainer = document.querySelector('.med');
medContainer.addEventListener('click', evt => {
  console.log(evt);
  if(evt.target.tagName === 'I'){
    
    const id = evt.target.getAttribute('data-id');


    console.log(id);
    db.collection('medication').doc(id).delete();
    var info = db.collection("info").doc("1");

          info.get().then((doc) => {
            info.update({
              totalMed: doc.data().totalMed - 1
          })
          .then(() => {
              console.log("Documento atualizado com sucesso!");
          })
          .catch((error) => {
              console.error("Erro ao atualizar documento: ", error);
          });
        });
  }
})


const med = document.querySelector('.med');
console.log(med);

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add medication form
  const forms = document.querySelectorAll('.side-form_med');
  M.Sidenav.init(forms, {edge: 'left'});
});

const rendermed = (data, id) => {

  const html = `

  <div class="card-panel med white row" data-id="${id}">
      <div class="med-clock">
        <input type="time" name="alarm" class="timepicker" value= ${data.medication_time} >
      </div>
      <div class="med-details">
          <div class="med-pill_name">${data.pill_name}</div>
          <div class="med-dose"> Dose: ${data.dose} </div>
      </div>
      <div>
      <input type="checkbox" name="myCheckbox" value="1">
      </div>
      <div class="med-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
  </div>

  `;

  med.innerHTML += html;

};

// remove medication
const removemed = (id) => {
  const med_out = document.querySelector(`.med[data-id=${id}]`);
  med_out.remove();
};



  


