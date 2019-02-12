function addItem(){
    var myArray = $("form").serializeArray();

    if($('.js-input').val() !== null && $('.js-input').val() !== ''){
        $.each(myArray, function(i,data){
            $('.js-received-items').append("<li>" + data.value + "</li>");
        });
        $('.js-input').val('');
    
        createArray();
    }
    
}

function createArray(){
    var listReady = [];

    $('.js-received-items li').each(function(i, elem){
        listReady.push($(elem).text());
    })

    //console.log(listReady);
}

function deleteItem(){
    $('.js-received-items li:last').remove();
}

function sendArray(){
    var listReady = [];
    var nameList = $('#nameList').val();

    $('.js-received-items li').each(function(i, elem){
        listReady.push($(elem).text());
    })
    
    var jsonString = JSON.stringify(listReady);
    $.ajax({

        type: "POST",
        url:'http://localhost:8080/servidor/inserts.php',
        data: {data : jsonString, nameList},
        success: function(){
            alert("OK!!!");
        },
        error: function(){
            alert("Erro no envio ajax");
        }
    });
}

    
    

    
