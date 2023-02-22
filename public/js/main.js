
//CSS

"use strict"; 

const body = document.body;
const bgColorsBody = ["#ffb457", "#ff96bd", "#9999fb", "#ffe797", "#cffff1"];
const menu = body.querySelector(".menu");
const menuItems = menu.querySelectorAll(".menu__item");
const menuBorder = menu.querySelector(".menu__border");
let activeItem = menu.querySelector(".active");

function clickItem(item, index) {

    menu.style.removeProperty("--timeOut");
    
    if (activeItem == item) return;
    
    if (activeItem) {
        activeItem.classList.remove("active");
    }

    
    item.classList.add("active");
    body.style.backgroundColor = bgColorsBody[index];
    activeItem = item;
    offsetMenuBorder(activeItem, menuBorder);
    
    
}

function offsetMenuBorder(element, menuBorder) {

    const offsetActiveItem = element.getBoundingClientRect();
    const left = Math.floor(offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth  - offsetActiveItem.width) / 2) +  "px";
    menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;

}

offsetMenuBorder(activeItem, menuBorder);

menuItems.forEach((item, index) => {

    item.addEventListener("click", () => clickItem(item, index));
    
})

window.addEventListener("resize", () => {
    offsetMenuBorder(activeItem, menuBorder);
    menu.style.setProperty("--timeOut", "none");
});
//-CSS


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


