function increaseNumberNotiContact(calssName){
  let currentValue = +$('.' + className).find("em").text();
  currentValue += 1;

  if(currentValue === 0){
    $('.' + className).html('')
  }
  else {
    $('.' + className).html('(<em>'+ currentValue +'</em>)');
  }
}



function addContact() {
  $('.user-add-new-contact').bind('click', function(){
    let targetId = $(this).data('uid');
    $.post("/contact/add-new", {uid: targetId}, function(data){
      if(data.success){
        $("#find-user").find('div.user-add-new-contact[data-uid = ' + targetId + "]").hide();
        $("#find-user").find('div.user-remove-request-contact[data-uid = ' + targetId + "]" ).css("display","inline-block");
        className = "count-request-contact-sent";
        increaseNumberNotiContact(className);
        // su ly real time o bai sau
      }
    })
  })
}

