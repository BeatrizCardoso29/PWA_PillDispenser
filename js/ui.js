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
      <img src="/img/pill.png" alt="medication thumb">
      <div class="medication-details">
        <div class="medication-title">${data.name}</div>
        <div class="medication-number_of_pills">${data.number_of_pills}</div>
        <div class="medication-deposit_number">${data.deposit_number}</div>
      </div>
      <div class="medication-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;
  medication.innerHTML += html;

};

// remove medication
const removeMedication = (id) => {
  const medication = document.querySelector(`.medication[data-id=${id}]`);
  medication.remove();
};