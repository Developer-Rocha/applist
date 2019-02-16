document.addEventListener('deviceready', printList);

function addItem(){
    var myArray = $("#form-createList").serializeArray();

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
        url:'http://localhost:8080/servidor/inserts.php', //WORK
        //url:'http://localhost/servidor2/inserts.php', //HOME
        data: {data : jsonString, nameList},
        success: function(){
            alert("OK!!!");

            $('.js-received-items li').remove();
            window.location.href = "index.html#my-lists";
        },
        error: function(){
            alert("Erro no envio ajax");
        }
    });
}

function printList(){
    $.ajax({
        url:'http://localhost:8080/servidor/findList.php', //WORK
        //url:'http://localhost/servidor2/findList.php', //HOME
        dataType:'json',
        success:function(r){
            var lista = "";
            var i;
            
            var total = r.length;
            
            for(i = 0; i < total; i++){
                var y = i - 1;
               
                if(i == 0){
                    lista += "<div class='name-list'><p>" + r[i].lista + "</p></div>";
                    lista += "<div class='btn-see'><button type='button' onclick='listSelected(\"" + r[i].lista + "\")'>VER</button></div><br>";

                    $('#view-lists').html(lista);
                }
                else if(r[i].lista !== r[y].lista){
                    lista += "<div class='name-list'><p>" + r[i].lista + "</p></div>";
                    lista += "<div class='btn-see'><button type='button' onclick='listSelected(\"" + r[i].lista + "\")'>VER</button></div><br>";

                    $('#view-lists').html(lista);
                }
                
            }
        },
        error:function(e){
            console.log('Erro no pedido ajax: ' + e.message);
            console.log(e);
        }

    })
}


function listSelected(n){
    var selectList = n;
    $.ajax({
        url:'http://localhost:8080/servidor/findList.php', //WORK
        //url:'http://localhost/servidor2/findList.php', //HOME
        dataType:'json',
        success:function(r){
            var lista = "";
            var i;
            var total = r.length;
            
            $('.js-allProd li').remove();
            
            for(i = 0; i < total; i++){
                
                if(r[i].lista == selectList){
                    //lista += r[i].produto;
                    lista += $('.js-allProd').append("<li>" + r[i].produto + "</li>");
                }
                
            }
            //console.log(lista);
            window.location.href='index.html#seeList';
        },
        error:function(e){
            console.log('Erro no pedido ajax: ' + e.message);
            console.log(e);
        }

    })
}

    
