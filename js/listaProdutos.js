function buscarProduto() {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/produtos",
        async: true,
        crossDomain : true,
        success : function(response) {
    
        $('#tabelaprincipalProduto> tbody > tr').remove();

        $("#id").val(response.id);

        for (var i = 0; i < response.length; i++) {

            const precoPuro = (response[i].preco);
            const precoFormatado = precoPuro.toLocaleString('pt-br', {minimumFractionDigits: 2});

            $('#tabelaprincipalProduto> tbody')
            .append(
                '<tr id="'+response[i].id+'"><td>'
                        + response[i].id
                        + '</td><td>'
                        + response[i].nomeProduto
                        + '</td><td>'
                        + response[i].descricao
                        + '</td><td>'
                        + precoFormatado                                             						
                        + '</td><td><button type="button" onclick="colocarEmEdicaoProduto('
                        + response[i].id
                        + ')" class="btn btn-primary">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteProduto('
                        + response[i].id
                        + ')">Delete</button></td></tr>');
                }

                    }
                }).fail(function(xhr, status, errorThrown) {
                    Swal.fire("Opss ", "Erro ao buscar produtos! " + xhr.responseText, "error");
        });

}

function botaoDeletarDaTela(){
	var id = $('#id').val();
	
	if(id != null && id.trim() != ''){
	 deleteProduto(id);
	 document.getElementById('formCadastroProduto').reset();
	}
}

function apagaForm() {
	document.getElementById("modalPesquisarProduto").reset();
	}

function apagaFormCadastro() {
    document.getElementById("formCadastroProduto").reset();
    }


function deleteProduto(id){
	
	Swal.fire({
        title: 'Você tem certeza?',
        text: "Essa ação não poderá ser revertida!",
        icon: 'warning',
        confirmButtonColor: '#a777e3',
        confirmButtonText: 'Sim, pode deletar!',
        showCancelButton: true,
        cancelButtonColor: 'gray'
        
      }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                method : "DELETE",
                url : "http://localhost:8080/api/produtos/" + id,
                data : "id=" + id ,
                success : function(response) {
                    
                $('#'+ id).remove();
                document.getElementById('formCadastroProduto').reset();
                Swal.fire("Pronto!", "Registro excluído com sucesso!", "success");	
                
                    apagaFormCadastro();
                    buscarProduto();
                }
            }), Swal.fire(
            'Deletado!',
            'Seu arquivo foi deletado com sucesso.',
            'success'
          )
        }
    })	
}

function pesquisarProduto() {
			
    var nome = $('#nameBusca').val();

    if (nome != null && nome.trim() != '') {
       
        $.ajax({
            method : "GET",
            url : "http://localhost:8080/api/produtos/nameBusca",
            data : "nome=" + nome,
            async: true,
            crossDomain : true,
            success : function(response) {

            $('#tabelaresultadosProduto> tbody > tr').remove();

            $("#id").val(response.id);

            for (var i = 0; i < response.length; i++) {

            const precoPuro = (response[i].preco);
            const precoFormatado = precoPuro.toLocaleString('pt-br', {minimumFractionDigits: 2});

                $('#tabelaresultadosProduto> tbody')
                .append(
                    '<tr id="'+response[i].id+'"><td>'

                            + response[i].id
                            + '</td><td>'
                            + response[i].nomeProduto
                            + '</td><td>'
                            + response[i].descricao
                            + '</td><td>'
                            + precoFormatado								
                            + '</td><td><button type="button" onclick="colocarEmEdicaoProduto('
                            + response[i].id
                            + ')" class="btn btn-primary" data-bs-dismiss="modal">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteProduto('
                            + response[i].id
                            + ')">Delete</button></td></tr>');
                    }

                        }
                    }).fail(function(xhr, status, errorThrown) {
                        Swal.fire("Opss ", "Erro ao pesquisar um produto! ", "error");
            });
    }
}

function colocarEmEdicaoProduto(id) {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/produtos/" + id,
        data : "id=" + id,
        success : function(response) {

            $("#id").val(response.id);
            $("#nomeProduto").val(response.nomeProduto);
            $("#descricao").val(response.descricao);

            const precoPuro = (response.preco);
            $("#preco").val(precoPuro.toLocaleString('pt-br',
                                 {minimumFractionDigits: 2}));

            

            $('#modalPesquisarProduto').modal('hide');
        }
        
        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Erro ao buscar produto por Id! " + xhr.responseText, "", "error");
    });
}

function salvarProduto() {  // Último Ajax

    var id = $("#id").val();
    var nomeProduto = $("#nomeProduto").val();
    var descricao = $("#descricao").val();

    var preco = $("#preco").val();
    preco = preco.replace(/[.]/g, "").replace(/[,]/g, ".");


    if (nomeProduto == null || nomeProduto != null && nomeProduto.trim() == '') {
        $("#descProduto").focus();
        Swal.fire("Opss!", "Informe o nome do produto", "info");
        return;
    }

    if (descricao == null || descricao != null && descricao.trim() == '') {
        $("#descProduto").focus();
        Swal.fire("Opss!", "Informe a descrição do produto", "info");
        return;
    }

    if (preco == null || preco != null && preco.trim() == '') {
        $("#preco").focus();
        Swal.fire("Opss!", "Informe o preço do produto", "info");
        return;
    }

    $.ajax({
        method : "POST",
        url : "http://localhost:8080/api/produtos",

        data : JSON.stringify({
            id: id,
            nomeProduto: nomeProduto,
            descricao: descricao,
            preco: preco

        }),
        contentType : "application/json; charset=utf-8",
        success : function(response) {
            $("#id").val(response.id);
            // console.log(response);
            Swal.fire("Pronto!", "Produto salvo com sucesso!", "success");

            buscarProduto();
            apagaFormCadastro();
            
        }
    
        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Opss ", "Erro ao salvar produto! " + xhr.responseText, "error");
    });

}

function buscarProdutoPDF(){
    
    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/produtos",
        async: true,
        crossDomain : true,
        success : function(response) {

        $('#tabelaprincipalProduto-hidden > tbody > tr').remove();

        $("#id").val(response.id);

        for (var i = 0; i < response.length; i++) {

        const precoPuro = (response[i].preco);
        const precoFormatado = precoPuro.toLocaleString('pt-br', {minimumFractionDigits: 2});

            $('#tabelaprincipalProduto-hidden > tbody')
            .append(
                '<tr id="'+response[i].id+'"><td>'
                        + response[i].id
                        + '</td><td>'
                        + response[i].nomeProduto
                        + '</td><td>'
                        + response[i].descricao
                        + '</td><td>'
                        + precoFormatado								
                        + '</td></tr>');
                }

                    }
    }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Opss ", "Erro ao buscar Produto: ", "error");
        });

} buscarProdutoPDF();


function gerarPdf() {

    var pegarDados = document.getElementById('tabelaprincipalProduto-hidden').innerHTML;

    var janela = window.open('','','width=792,height=760');
            janela.document.write('<html><head>');
            janela.document.write('<link rel="stylesheet" href="../css/all.css"></link>');
            janela.document.write('<link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css"></link>');
            janela.document.write('<title>Lista de Produtos PDF</title></head>');  
            
            janela.document.write('<body>'); 
            janela.document.write('<body><img src="../images/cabecalho2.png" alt="">');
            janela.document.write('<div style="height: 500px;margin: 20px">');
            janela.document.write('<h2>Cadastro de Produtos</h2>');
            janela.document.write('<br>');
            janela.document.write('<table class="table table-hover table-striped"');
            janela.document.write(pegarDados); 
            
            janela.document.write('</table>');
            
            janela.document.write('</div>');
            janela.document.write('</body></html>');
            janela.document.close();
            janela.print();
}

function gerarUmPdf() {
    var id = $("#id").val();
    
    if (id > 0 || id != "") {

        //var id = $("#id").val();
        var nome = $("#nomeProduto").val();    
        var descricao = $("#descricao").val();
        var preco = $("#preco").val();
  
        
        var jan = window.open('','','width=792,height=760');
        
       

        jan.document.write('<link rel="stylesheet" href="../css/all.css"></link>');
        jan.document.write('<link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css"></link>');

        jan.document.write('<title>Registro da Produto</title></head>');  
        
        jan.document.write('<body><img src="../images/cabecalho2.png" alt="">'); 

        jan.document.write('<div style="height: 600px;margin: 20px">');
        jan.document.write('<h2>Registro do Produto </h2>');

        // <div style="height: 600px;overflow: scroll;" hidden>
        // <table class="table table-hover table-striped"

        jan.document.write('<br><strong> ID: </strong>' + id + '<br>');
        jan.document.write('<strong> NOME: </strong>' + nome + '<br>');
        jan.document.write('<strong> DESCRIÇÃO: </strong>' + descricao + '<br>');
        jan.document.write('<strong> PREÇO: </strong>' + preco + '<br>');
                   
        jan.document.write('_______________________________________________');
        jan.document.write('</div>');
        jan.document.write('</div></html>');
        jan.document.close();
        jan.print()

    } else {
        Swal.fire("Opss ", "Selecione um produto! ", "error");
    }
} 
