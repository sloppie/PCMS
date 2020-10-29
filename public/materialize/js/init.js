$(document).ready(function(){
  $('.sidenav').sidenav();
  $('select').formSelect();
});

document.getElementById('fake-menu').onclick = function (e) {
    document.getElementById('real-menu').click();
};
