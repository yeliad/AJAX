$(document).ready(function(){

  $(document).bind('ajaxError', 'form#new_person', function(event, jqxhr, settings, exception){

    // note: jqxhr.responseJSON undefined, parsing responseText instead
    $(event.data).render_form_errors( $.parseJSON(jqxhr.responseText) );



  });
  $(document).bind('ajaxSuccess', 'form#seach_form', function(event, jqxhr, settings, exception){

    // note: jqxhr.responseJSON undefined, parsing responseText instead
   // var x = this.getElementById(".realresults");

var x = $(document.getElementById('realresults'));
    //var x = $( ".inner" );
    x.html("");
       
      var data = jQuery.parseJSON(jqxhr.responseText);
      console.log('got result' + data + " " + data.length);

console.log($(document.getElementById('realresults')));
console.log(x);

      
x.append("<table class='table' id='people_table'>");
  x.append("<thead>");
  x.append("<tr>");
  x.append("<th>First name</th>");
  x.append("<th>Last name</th>");
  x.append("<th></th>");
  x.append("<th></th>");
  x.append("<th></th>");
  x.append("</tr>");
  x.append("</thead>");
  x.append("<tbody>");



      var tr;




    for (var i = 0; i < data.length; i++) {
        tr = $('<tr/>');
        tr.append("<td>" + data[i].first_name +"</td>");
        tr.append("<td>" + data[i].last_name + "</td>");
        x.append(tr);
    }

  x.append("</tbody>");
x.append("</table>");  
  });




});

(function($) {

  $.fn.modal_success = function(){
    // close modal
    this.modal('hide');

    // clear form input elements
    // todo/note: handle textarea, select, etc
    this.find('form input[type="text"]').val('');

    // clear error state
    this.clear_previous_errors();
  };

  $.fn.render_form_errors = function(errors){

    $form = this;
    this.clear_previous_errors();
    model = this.data('model');

    // show error messages in input form-group help-block
    $.each(errors, function(field, messages){
      $input = $('input[name="' + model + '[' + field + ']"]');
      $input.closest('.form-group').addClass('has-error').find('.help-block').html( messages.join(' & ') );
    });

  };

  $.fn.clear_previous_errors = function(){
    $('.form-group.has-error', this).each(function(){
      $('.help-block', $(this)).html('');
      $(this).removeClass('has-error');
    });
  }

}(jQuery));
