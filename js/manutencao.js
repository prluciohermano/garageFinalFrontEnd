function buscarGaragem() {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/garage-box",
    
        success : function(response) {

        $('#tabelaprincipalGar> tbody > tr').remove();

        $("#id").val(response.id);

        for (var i = 0; i < response.length; i++) {
            $('#tabelaprincipalGar> tbody')
            .append(
                '<tr id="'+response[i].id+'"><td>'

                        + response[i].id
                        + '</td><td>'
                        + response[i].numeroBox
                        + '</td><td>'
                        + response[i].produtoModel.placaCar
                        + '</td><td>'
                        + response[i].produtoModel.descricao	
                        + '</td><td>'
                        + response[i].produtoModel.corProduto
                        + '</td><td>'
                        + response[i].produtoModel.pessoaModel.nome
                        + '</td><td>'
                        + response[i].defeitoCar
                        + '</td><td>'
                        + response[i].mecanicoCar                        						
                        + '</td><td><button type="button" class="btn btn-danger" onclick="deleteGaragem('
                        + response[i].id
                        + ')">Delete</button></td></tr>');
                        // <button type="button" onclick="colocarEmEdicaoGar('
                        // + response[i].id
                        // + ')" class="btn btn-primary">Ver</button></td><td>
                        carregaBox();
                }

                    }
                }).fail(function(xhr, status, errorThrown) {
            alert("Erro ao buscar garagem: " + xhr.responseText);
        });
    
} 


function botaoDeletarDaTela(){
	var id = $('#id').val();
	
	if(id != null && id.trim() != ''){
	 deleteGaragem(id);
	 document.getElementById('formCadastroGaragem').value = "";
	}

    buscarGaragem();
}


function apagaFormGaragem() {
    document.getElementById('id').value = "";
    document.getElementById('numeroBox').value = "";
    document.getElementById('placaCar').value = "";
    document.getElementById('descricao').value = "";
    document.getElementById('corProduto').value = "";
    document.getElementById('nomeResp').value = "";
    document.getElementById('defeitoCar').value = "";
    document.getElementById('mecanicoCar').value = "";

 }

function deleteGaragem(id){
	
	if(confirm('Deseja realmente deletar?')) {
	
	 $.ajax({
			method : "DELETE",
			url : "http://localhost:8080/api/garage-box/" + id,
			data : "id=" + id ,
			success : function(response) {
				
			$('#'+ id).remove();
			// document.getElementById('formCadastroGaragem').reset();
				alert("GARAGEM Excluída com sucesso!");	
            
                apagaFormGaragem();
                buscarGaragem();
                
			 }
		}).fail(function(xhr, status, errorThrown) {
			alert("Erro ao deletar garagem por id: " + xhr.responseText);
		});
	}	
}

function pesquisarGaragem() {
			
    var nome = $('#nameBusca').val();
    if (nome != null && nome.trim() != '') {
       
        $.ajax({
            method : "GET",
            url : "http://localhost:8080/api/garage-box/nameBusca",
            data : "nome=" + nome,
            success : function(response) {

            $('#tabelaresultadosGar> tbody > tr').remove();

            $("#id").val(response.id);

            for (var i = 0; i < response.length; i++) {
                $('#tabelaresultadosGar> tbody')
                .append(
                    '<tr id="'+response[i].id +'"><td>'
                    
                            + response[i].id
                            + '</td><td>'
                            + response[i].numeroBox
                            + '</td><td>'
                            + response[i].produtoModel.placaCar
                            + '</td><td>'
                            + response[i].produtoModel.descricao	
                            + '</td><td>'
                            + response[i].produtoModel.corProduto
                            + '</td><td>'
                            + response[i].produtoModel.pessoaModel.nome
                            + '</td><td>'
                            + response[i].defeitoCar
                            + '</td><td>'
                            + response[i].mecanicoCar								
                            + '</td><td><button type="button" class="btn btn-danger" onclick="deleteGaragem('
                            + response[i].id
                            + ')">Delete</button></td></tr>');
                            // <button type="button" onclick="colocarEmEdicaoGar('
                            // + response[i].id
                            // + ')" class="btn btn-primary">Ver</button></td><td>
                            
                    }

                        }
                    }).fail(function(xhr, status, errorThrown) {
                alert("Erro ao pesquisar um Produto: " + xhr.responseText);
            });
    }
}

function colocarEmEdicaoGar(id) {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/garage-box/" + id,
        data : "id=" + id,
        success : function(response) {

            $("#id").val(response.id);
            $("#numeroBox").val(response.numeroBox);
            $("#placaCar").val(response.produtoModel.placaCar);
            $("#dataEntrada").val(response.produtoModel.dataEntrada);
            $("#descricao").val(response.produtoModel.descricao);
            $("#corProduto").val(response.produtoModel.corProduto);
            $("#nomeResp").val(response.pessoaModel.nome);
            $("#defeitoCar").val(response.defeitoCar);
            $("#mecanicoCar").val(response.mecanicoCar);            

            $('#modalPesquisarGaragem').modal('hide');
            apagaFormGaragem();
        }
    }).fail(function(xhr, status, errorThrown) {
        alert("Erro ao buscar garagem por id: " + xhr.responseText);
    });

}

function salvarGaragem() {  // Último Ajax

    var id = $("#id").val();
    var numeroBox = $("#numeroBox").val();
    var placaCar = $("#placaCar").val();
    var defeitoCar = $("#defeitoCar").val();
    var mecanicoCar = $("#mecanicoCar").val();

    if (numeroBox == null || numeroBox != null && numeroBox.trim() == '') {
        $("#numeroBox").focus();
        alert('Informe o número do box');
        return;
    }
    if (defeitoCar == null || defeitoCar != null && defeitoCar.trim() == '') {
        $("#defeitoCar").focus();
        alert('Informe o defeito encontrado');
        return;
    }
    if (mecanicoCar == null || mecanicoCar != null && mecanicoCar.trim() == '') {
        $("#mecanicoCar").focus();
        alert('Informe o nome do mecânico');
        return;
    }

    $.ajax({
        method : "PUT",
        url : "http://localhost:8080/api/garage-box",
        data : JSON.stringify({
            id : id,
            defeitoCar : defeitoCar,
            mecanicoCar : mecanicoCar

        }),
        
        contentType : "application/json; charset=utf-8",
        success : function(response) {
            $("#id").val(response.id);
            alert("Gravou com sucesso!");
            apagaFormGaragem();
        } 

    }).fail(function(xhr, status, errorThrown) {
        alert("Erro ao salvar Garagem: " + xhr.responseText);
    });
    
    buscarGaragem();

}

function pesquisarCarro() {
			
    var placaCar = $('#placaCarro').val();
    console.log(" Número da placa" + placaCar);

    if (placaCar != null && placaCar.trim() != '') {
       
        $.ajax({
            method : "GET",
            url : "http://localhost:8080/api/produtos/placaCarro",
            data : "placaCar=" + placaCar,
            success : function(response) {
                console.log(" Número da placa" + response[0].placaCar);
            
                $('#tabelaresultadosCarro> tbody > tr').remove();

            $("#id").val(response.id);
            $("#nomeResp").val(response[0].pessoaModel.id);
            for (var i = 0; i < response.length; i++) {

                $('#tabelaresultadosCarro> tbody')
                .append(
                    '<tr id="'+response[i].id +'"><td>'
                    
                            + response[i].id
                            + '</td><td>'
                            + response[i].descricao
                            + '</td><td>'
                            + response[i].placaCar								
                            + '</td><td><button type="button" onclick="colocarEmEdicaoCarro('
                            + response[i].id
                            + ')" class="btn btn-primary">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteGaragem('
                            + response[i].id
                            + ')">Delete</button></td></tr>');
                }
                        }
                    }).fail(function(xhr, status, errorThrown) {
                alert("Erro ao pesquisar um Produto: " + xhr.responseText);
            });
    }
}



function colocarEmEdicaoCarro(id) {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/produtos/" + id,
        data : "id=" + id,
        success : function(response) {

            $("#id").val(response.id);
            $("#descricao").val(response.descricao);
            $("#placaCar").val(response.placaCar);
            $("#corProduto").val(response.corProduto);
            $("#nomeResp").val(response.pessoaModel.nome);
            $("#nomeRespId").val(response.pessoaModel.id);
            
            $('#modalPesquisarCarro').modal('hide');
            apagaForm();
        }
    }).fail(function(xhr, status, errorThrown) {
        alert("Erro ao buscar garagem por id: " + xhr.responseText);
    });

}

function pesquisarBox(box) {
  
    $("#numeroBox").val(box);
    var heading = document.getElementById('title-div '+ box);
    heading.style.backgroundColor = "green";
    heading.style.color = "white";
    //document.getElementById('title-div '+ box).innerHTML = "OK";
    console.log(heading.id);
    
}


function salvarCarroNaGaragem() {  // Último Ajax

    var id = $("#id").val();
    var numeroBox = $("#numeroBox").val();
    var defeitoCar = $("#defeitoCar").val();
    var mecanicoCar = $("#mecanicoCar").val();


    if (numeroBox == null || numeroBox != null && numeroBox.trim() == '') {
        $("#numeroBox").focus();
        alert('Informe o número do box');
        return;
    }
    if (defeitoCar == null || defeitoCar != null && defeitoCar.trim() == '') {
        $("#defeitoCar").focus();
        alert('Informe o defeito encontrado');
        return;
    }
    if (mecanicoCar == null || mecanicoCar != null && mecanicoCar.trim() == '') {
        $("#mecanicoCar").focus();
        alert('Informe o nome do mecânico');
        return;
    }

    $.ajax({ // Esse ques salva
        method : "POST",
        url : "http://localhost:8080/api/produtos/"+ id +"/garage",
        data : JSON.stringify({
            
            id : id,
            numeroBox : numeroBox,
            defeitoCar : defeitoCar,
            mecanicoCar : mecanicoCar

        }),
        contentType : "application/json; charset=utf-8",
        success : function(response) {
            $("#id").val(response.id);
            
            alert("Gravou com sucesso!");
            buscarGaragem();                 
        }

    }).fail(function(xhr, status, errorThrown) {
        alert("Erro ao salvar Garagem: Garagem Ocupada");
    });
    apagaFormGaragem();
}

function carregaCategoria() {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/categorias",
        success : function(response) {
            
        for (var i = 0; i < response.length; i++) {
            var idCat = response[i].id;
            var value = response[i].nome;
            $("#categoria").append("<option value='" + idCat + "'>" + value + "</option>");
        }

     }

    }).fail(function(xhr, status, errorThrown) {
        alert("Erro ao carregar Categoria " + xhr.responseText);
    });

} carregaCategoria();


function carregaBox() { // Carrega Boxes

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/garage-box",
        success : function(response) {
            //$("#preencheBoxes").append("<h4>Boxes Ocupados: </h4>")
        for (var i = 0; i < response.length; i++) {
            // var idCat = response[i].id;
            var value = response[i].numeroBox;
            if (value != null && value.trim() != '') {

                var heading = document.getElementById('title-div '+ value);
                heading.style.backgroundColor = "rgba(245, 94, 94, 0.245)";
                heading.style.color = "#ef5350";

            // $("#preencheBoxes").append("<option value='" + idCat + "'>" + value + "</option>");
            // $("#preencheBoxes").append("<div id='title-div '" + value + " onclick='" + "pesquisarBox("+ value +")"
            //  + " style='cursor: pointer' class='box-icons box box-02'><i class='fa-solid fa-car'></i>" + value + "</div>");
            }
        }

     }

    }).fail(function(xhr, status, errorThrown) {
        alert("Erro ao carregar Boxes " + xhr.responseText);
    });

} carregaBox();