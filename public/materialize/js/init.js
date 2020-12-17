$(document).ready(function(){
  $('.sidenav').sidenav();
  $('select').formSelect();
  
  document.getElementById('search_box').oninput = function (e) {

      var searchKey = this.value;
      $('.data_row').each(function () {
          var tr = $(this);
          var found = false;
          $(this).children().each(function () {
            var td = $(this);
              var text = td.text().toLowerCase();
              if (text.includes(searchKey.toLowerCase())) {
                  found = true;
              }
          });
          if (found) {
              tr.removeClass('d-none');
          }else {
              tr.addClass('d-none')
          }
      });

  };
});

document.getElementById('fake-menu').onclick = function (e) {
    document.getElementById('real-menu').click();
};
