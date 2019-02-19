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

    $('.wrap-error').hide(200);
}

function createArray(){
    var listReady = [];

    $('.js-received-items li').each(function(i, elem){
        listReady.push($(elem).text());
    })
}

function deleteItem(){
    $('.js-received-items li:last').remove();
}

function criaLista(){
    var listReady = [];
    var nameList = $('#nameList').val();

    $('.js-received-items li').each(function(i, elem){
        listReady.push($(elem).text());
    })

    if(listReady.length > 0){
        var jsonString = JSON.stringify(listReady);
        $.ajax({
    
            type: "POST",
            //url:'http://localhost:8080/servidor/inserts.php', //WORK
            //url:'http://localhost/servidor2/inserts.php', //HOME
            url:'http://uxdeveloper.online/servidor2/inserts.php', //ONLINE
            data: {data : jsonString, nameList},
            success: function(){
                alert("OK!!!");
    
                $('.js-received-items li').remove();
                printList();
                window.location.href = "index.html#my-lists";
            },
            error: function(){
                alert("Erro no envio ajax");
            }
        });
    } else{
        $('.wrap-error').show(200);
    }
    
}

function printList(){
    $.ajax({
        //url:'http://localhost:8080/servidor/listas.php', //WORK
        //url:'http://localhost/servidor2/listas.php', //HOME
        url:'http://uxdeveloper.online/servidor2/listas.php', //ONLINE
        dataType:'json',
        success:function(r){
            var myArray = "";
            var i;
            var total = r.length;
            
            for(i = 0; i < total; i++){
                myArray += "<div class='name-list'><button type='button' class='btn-lista' onclick='listSelected(\"" + r[i].ID_lista + "\")'>" + r[i].lista + "</p></div>";
                myArray += "<div class='btn-see'><button type='button' onclick='deletaLista(\"" + r[i].ID_lista + "\")'>Deletar</button></div><br>";

                $('#view-lists').html(myArray);
            }
        },
        error:function(e){
            console.log('Erro no pedido ajax: ' + e.message);
            console.log(e);
        }

    })
}


function listSelected(n){
    var selectedList = n;
    $.ajax({
        //url:'http://localhost:8080/servidor/findList.php', //WORK
        //url:'http://localhost/servidor2/findList.php', //HOME
        url:'http://uxdeveloper.online/servidor2/findList.php', //ONLINE
        type:'POST',
        data: {selectedList},
        success:function(r){
            var lista = "";
            var i;
            var total = r.length;
            
            $('.js-allProd li').remove();

            //Print do nome da lista selecionada.
            $('#title-List').val(r[0].lista);
            
            for(i = 0; i < total; i++){
                lista += $('.js-allProd').append("<li>" + r[i].produto + "</li>");
            }
            window.location.href='index.html#seeList';
        },
        error:function(e){
            console.log('Erro no pedido ajax: ' + e.message);
            console.log(e);
        }

    })
}

function deletaLista(n){
    var id_lista = n;
    $.ajax({
        //url:'http://localhost:8080/servidor/deletarLista.php', //WORK
        //url:'http://localhost/servidor2/deletarLista.php', //HOME
        url:'http://uxdeveloper.online/servidor2/deletarLista.php', //ONLINE
        type:'POST',
        data:{id_lista},
        success:function(r){
            printList();
            console.log('deletado com sucesso');
        },
        error:function(e){
            console.log('erro no pedido ajax');
        }
    })
} 

