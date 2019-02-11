function addItem(){
    var myArray = $("form").serializeArray();

    $.each(myArray, function(i,data){
        $('.js-received-items').append("<li>" + data.value + "</li>");
    });
    $('.js-input').val('');

    createArray();
}

function createArray(){
    var listReady = [];

    $('.js-received-items li').each(function(i, elem){
        listReady.push($(elem).text());
    })

    console.log(listReady);
}

function deleteItem(){
    $('.js-received-items li:last').remove();
}



    
    

    
