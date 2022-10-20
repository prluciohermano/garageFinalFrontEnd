function buscarPessoa() {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/pessoas",
        async: true,
        crossDomain : true,
        success : function(response) {

        $('#tabelaprincipal > tbody > tr').remove();

        $("#id").val(response.id);

        for (var i = 0; i < response.length; i++) {
            $('#tabelaprincipal > tbody')
            .append(
                '<tr id="'+response[i].id+'"><td>'
                        + response[i].id
                        + '</td><td>'
                        + response[i].nome
                        + '</td><td>'
                        + response[i].email
                        + '</td><td>'
                        + response[i].cpf	
                        + '</td><td>'
                        + response[i].cidade
                        + '</td><td>'
                        + response[i].uf							
                        + '</td><td><button type="button" onclick="colocarEmEdicao('
                        + response[i].id
                        + ')" class="btn btn-primary">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deletePessoa('
                        + response[i].id
                        + ')">Delete</button></td></tr>');
                }

                    }
                }).fail(function(xhr, status, errorThrown) {
                    Swal.fire("Opss ", "Erro ao buscar Pessoa: ", "error");
        });

}

function botaoDeletarDaTela(){
	var id = $('#id').val();
	
	if(id != null && id.trim() != ''){
	 deleteUser(id);
	 document.getElementById("formCadastroPessoa").reset();
	}

    
}

function apagaForm() {
	document.getElementById("modalPesquisarPessoa").reset();
}

function apagaFormPessoa() {
    document.getElementById("formCadastroPessoa").reset();
}


function deletePessoa(id){
	
	if(confirm('Deseja realmente deletar?')) {
	
	 $.ajax({
			method : "DELETE",
			url : "http://localhost:8080/api/pessoas/" + id,
			data : "id=" + id,
            async: true,
            crossDomain : true,
			success : function(response) {
				
				//$('#'+ id).remove();
			document.getElementById('formCadastroPessoa').reset();
            Swal.fire("Pronto", "Registro Excluído com sucesso!", "success");	
                
                apagaFormPessoa();
                buscarPessoa();
			}
		}).fail(function(xhr, status, errorThrown) {
			Swal.fire("Opss ", "Erro ao deletar pessoa por id: ", "error");
		});
	}	
}

function pesquisarPessoa() {
			
    var nome = $('#nameBusca').val();

    if (nome != null && nome.trim() != '') {
       
        $.ajax({
            method : "GET",
            url : "http://localhost:8080/api/pessoas/nameBusca",
            data : "nome=" + nome,
            async: true,
            crossDomain : true,
            success : function(response) {

            $('#tabelaresultados > tbody > tr').remove();

            $("#id").val(response.id);

            for (var i = 0; i < response.length; i++) {
                $('#tabelaresultados > tbody')
                .append(
                    '<tr id="'+response[i].id+'"><td>'
                            + response[i].id
                            + '</td><td>'
                            + response[i].nome
                            + '</td><td>'
                            + response[i].cpf								
                            + '</td><td><button type="button" onclick="colocarEmEdicao('
                            + response[i].id
                            + ')" class="btn btn-primary">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deletePessoa('
                            + response[i].id
                            + ')">Delete</button></td></tr>');
                    }

                        }
                    }).fail(function(xhr, status, errorThrown) {
                        Swal.fire("Opss ", "Erro ao pesquisar uma Pessoa: ", "error");
            });
    }
}

function colocarEmEdicao(id) {

      
    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/pessoas/" + id,
        data : "id=" + id,
        async: true,
        crossDomain : true,
        success : function(response) {

            
            $("#id").val(response.id);
            $("#nome").val(response.nome);

            var cpfPuro =  (response.cpf);
            $("#cpf").val(cpfPuro.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));

            $("#rg").val(response.rg);
            $("#sexo").val(response.sexo);

            const dataInput = (response.dataNasci);
            const data = new Date(dataInput);
            dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
            $("#dataNasci").val(dataFormatada);

            var cepPuro = (response.cep);
            $("#cep").val(cepPuro.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2-$3"));

            $("#rua").val(response.rua);
            $("#numero").val(response.numero);
            $("#bairro").val(response.bairro);
            $("#comp").val(response.comp);
            $("#cidade").val(response.cidade);
            $("#uf").val(response.uf);
            $("#email").val(response.email);
            $("#tipo").val(response.tipospessoa.id);
            $("#cargo").val(response.cargo);

            console.log(response.cargo);
            $('#modalPesquisarPessoa').modal('hide');
            
        }
    }).fail(function(xhr, status, errorThrown) {
        Swal.fire("Opss ", "Erro ao buscar pessoa por Id", "error");
    });
}

function salvarPessoa() { // Ultimo Ajax

    var id = $("#id").val();
    var nome = $("#nome").val();    

    var cpf = $("#cpf").val();
    cpf = cpf.replace(/[^\d]/g, "");

    var rg = $("#rg").val();
    var sexo = $("#sexo").val();
    var data = $("#dataNasci").val();

    var dataNasci = moment(data, "DD/MM/YYYY");
    dataNasci.format("YYYY-MM-DD")

    var cep = $("#cep").val();
    cep = cep.replace(/[^\d]/g, "");

    var rua = $("#rua").val();
    var numero = $("#numero").val();
    var bairro = $("#bairro").val();
    var comp = $("#comp").val();
    var cidade = $("#cidade").val();
    var uf = $("#uf").val();

    var email = $("#email").val();

    var tipo = $("#tipo").val();
    var cargo = $("#cargo").val();

    if (nome == null || nome != null && nome.trim() == '') {
        $("#nome").focus();
        Swal.fire("Opss!", "Informe o nome", "info");
        return;
    }

    if (cpf == null || cpf != null && cpf.trim() == '' || cpf.length < 11) {
        $("#cpf").focus();
        Swal.fire("Opss!", 'Informe um CPF válido', "info");
        return;
    }

    if (rg == null || rg != null && rg.trim() == '') {
        $("#rg").focus();
        Swal.fire("Opss!",'Informe o RG', "info");
        return;
    }

    if (sexo == null || sexo != null && sexo.trim() == '') {
        $("#sexo").focus();
        Swal.fire("Opss!", 'Informe o Sexo', "info");
        return;
    }

    if (tipo == null || tipo != null && tipo.trim() == '') {
        $("#tipo").focus();
        Swal.fire("Opss!", 'Informe o Tipo', "info");
        return;
    }

    if (cargo == null || cargo != null && cargo.trim() == '') {
        $("#cargo").focus();
        Swal.fire("Opss!", 'Informe o Cargo', "info");
        return;
    }

    if (cep == null || cep != null && cep.trim() == '' || cep.length < 8) {
        $("#cep").focus();
        Swal.fire("Opss!", 'Informe o CEP', "info");
        return;
    }

    if (rua == null || rua != null && rua.trim() == '') {
        $("#rua").focus();
        Swal.fire("Opss!", 'Informe o nome da rua', "info");
        return;
    }
    if (numero == null || numero != null && numero.trim() == '') {
        $("#numero").focus();
        Swal.fire("Opss!", 'Informe o Número', "info");
        return;
    }
    if (bairro == null || bairro != null && bairro.trim() == '') {
        $("#bairro").focus();
        Swal.fire("Opss!", 'Informe o Bairro', "info");
        return;
    }
    if (cidade == null || cidade != null && cidade.trim() == '') {
        $("#cidade").focus();
        Swal.fire("Opss!", 'Informe a Cidade', "info");
        return;
    }
    if (uf == null || uf != null && uf.trim() == '') {
        $("#uf").focus();
        Swal.fire("Opss!", 'Informe o Estado', "info");
        return;
    }
    if (email == null || email != null && email.trim() == '') {
        $("#email").focus();
        Swal.fire("Opss!", 'Informe o E-mail', "info");
        return;
    }

    $.ajax({
       
        method : "POST",
        url : "http://localhost:8080/api/pessoas",
        async: true,
        crossDomain : true,
        data : JSON.stringify({
            id: id,
            nome: nome,
            cpf: cpf,
            rg: rg,
            sexo: sexo,
            dataNasci: dataNasci,
            cep: cep,
            rua: rua,
            numero: numero,
            bairro: bairro,
            comp: comp,
            cidade: cidade,
            uf: uf,
            email: email,
            tipospessoa: {
                id: tipo,
            },
            cargo: cargo,
        }),
        contentType : "application/json; charset=utf-8",
        success : function(response) {
            $("#id").val(response.id);
            Swal.fire("Pronto", "Savo com sucesso!", "success");

            buscarPessoa();
            apagaFormPessoa();
        }

    }).fail(function(xhr, status, errorThrown) {
        Swal.fire("Opss ", xhr.status + " - Erro ao salvar pessoa: " + xhr.responseText, "error");
    });

}

$(document).ready(function() {
    carregarSelect("tipo");

    function carregarSelect(idt) {
        var html = "";

        $.getJSON('http://localhost:8080/api/tipopessoas', function(data) {
            html += '<option value="">Selecione</option>';
             
            if(idt == 'tipo') {
                for(var i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].id + '">' + data[i].nome + '</option>'; 
                }
            }
            $("#" + idt).html(html); 

        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Opss ", "Erro ao salvar pessoa: ", "error");
        });
    }
});

$(document).ready(function() {
    carregarSelect("cargo");

    function carregarSelect(idt) {
        var html = "";

        $.getJSON('http://localhost:8080/api/pessoas', function(data) {
            html += '<option value="">Selecione</option>';
             
            if(idt == 'cargo') {
                for(var i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].cargo + '">' + data[i].cargo + '</option>';       
                }
            }
            $("#" + idt).html(html);  

        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Opss ", "Erro ao salvar pessoa: ", "error");
        });
    }
});




