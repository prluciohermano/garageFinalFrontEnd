const firstLog = JSON.parse(sessionStorage.getItem('token'));
console.log(firstLog);

if (firstLog == null) {
        location.href = "/login.html"
} else {

    const fotoPerfil = JSON.parse(sessionStorage.getItem('fotoPerfil'));
    var tipo = document.getElementById('fotoPerfil');
    tipo.src = fotoPerfil;
    const nomePer = JSON.parse(sessionStorage.getItem('nomePer'));
    document.getElementById('nomePerfil').innerHTML = ("Usuário: " + nomePer);
    
    const baseServidor = "http://localhost:8080";
    const tokenNovo = JSON.parse(sessionStorage.getItem('token'));
    const Content = 'Content-Type';
    const application = 'application/json;charset=UTF-8'
    const Authorization = 'Authorization';

    function buscarPessoa() {

        $.ajax({
            method : "GET",
            url : "http://localhost:8080/api/pessoas",
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
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
                            + ')" class="btn btn-primary" >Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deletePessoa('
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
            deletePessoa(id);
        }

    }

    function apagaForm() {
        document.getElementById("modalPesquisarPessoa").reset();
    }

    function apagaFormPessoa() {
        document.getElementById("formCadastroPessoa").reset();
    }

    function deletePessoa(id){

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Você tem certeza?',
            text: "Essa ação não poderá ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, pode deletar!',
            cancelButtonText: 'Não, não tenho certeza',
            reverseButtons: true
          }).then((result) => {

            if (result.isConfirmed) {
                
                  $.ajax({
                          method : "DELETE",
                          url : "http://localhost:8080/api/pessoas/" + id,
                          data : "id=" + id,
                          dataType: "json",
                          headers : { Authorization : tokenNovo, Content : application },
                          async: true,
                          crossDomain : true,
                        })

                        buscarPessoa();

                swalWithBootstrapButtons.fire(
                    'Deletado!',
                    'Seu arquivo foi deletado com sucesso.',
                    'success'
                    )
                buscarPessoa();

            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'Seu arquivo não foi excluído!',
                'error'
              )
            }
          })

    }


    function pesquisarPessoa() {
                
        var nome = $('#nameBusca').val();

        if (nome != null && nome.trim() != '') {
        
            $.ajax({
                method : "GET",
                url : "http://localhost:8080/api/pessoas/nameBusca",
                data : "nome=" + nome,
                dataType: "json",
                headers : { Authorization : tokenNovo, Content : application },
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
                                + ')" class="btn btn-primary" data-bs-dismiss="modal">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deletePessoa('
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
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
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

        if (sexo == "Selecione" || sexo != null && sexo.trim() == '') {
            $("#sexo").focus();
            Swal.fire("Opss!", 'Informe o Sexo', "info");
            return;
        }

        if (tipo == "Selecione" || tipo != null && tipo.trim() == '') {
            $("#tipo").focus();
            Swal.fire("Opss!", 'Informe o Tipo', "info");
            return;
        }

        if (cargo == "Selecione" || cargo != null && cargo.trim() == '') {
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
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
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


        

    function carregarSelect(idt) {

        var tipo = idt;

        console.log(tipo);
        
            var html = "";
            
            $.ajax({
                method : "GET",
                url : "http://localhost:8080/api/tipopessoas",

                dataType: "json",
                headers : { Authorization : tokenNovo, Content : application },
                async: true,
                crossDomain : true,
                
                success : function(data) {
                html += '<option value="">Selecione</option>';
                
                if(idt == 'tipo') {
                    for(var i = 0; i < data.length; i++) {
                        html += '<option value="' + data[i].id + '">' + data[i].nome + '</option>'; 
                    }
                }

                $("#" + idt).html(html); 
            }

            }).fail(function(xhr, status, errorThrown) {
                Swal.fire("Opss ", "Erro ao carregar tipo de pessoa: ", "error");
            });

        } carregarSelect("tipo");


    function buscarPessoaPDF(){
        
        $.ajax({
            method : "GET",
            url : "http://localhost:8080/api/pessoas",
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,
            success : function(response) {

            $('#tabelaprincipal-hidden > tbody > tr').remove();

            $("#id").val(response.id);

            for (var i = 0; i < response.length; i++) {
                $('#tabelaprincipal-hidden > tbody')
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
                            + '</td></tr>');
                    }

                        }
        }).fail(function(xhr, status, errorThrown) {
                Swal.fire("Opss ", "Erro ao buscar Pessoa: ", "error");
            });

    } buscarPessoaPDF();


    function gerarPdf() {

        var pegarDados = document.getElementById('tabelaprincipal-hidden').innerHTML;

        var janela = window.open('','','width=792,height=760');
                janela.document.write('<html><head>');
                janela.document.write('<link rel="stylesheet" href="../css/all.css"></link>');
                janela.document.write('<link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css"></link>');
                janela.document.write('<title>Lista Pessoas PDF</title></head>');  
                
                janela.document.write('<body>'); 
                janela.document.write('<body><img src="../images/cabecalho2.png" alt="">');
                janela.document.write('<div style="height: 500px;margin: 20px">');
                janela.document.write('<h2>Cadastro de Pessoas</h2>');
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
            var nome = $("#nome").val();    
            var cpf = $("#cpf").val();
            var rg = $("#rg").val();
            var sexo = $("#sexo").val();
            const dataInput = $("#dataNasci").val();
            const data = new Date(dataInput);
            dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
            dataNasci = dataFormatada;
            var cep = $("#cep").val();
            var rua = $("#rua").val();
            var numero = $("#numero").val();
            var bairro = $("#bairro").val();
            var comp = $("#comp").val();
            var cidade = $("#cidade").val();
            var uf = $("#uf").val();
            var email = $("#email").val();
            // var tipo = $("#tipo").val();
            var cargo = $("#cargo").val();

            
            var jan = window.open('','','width=792,height=760');
            
        

            jan.document.write('<link rel="stylesheet" href="../css/all.css"></link>');
            jan.document.write('<link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css"></link>');

            jan.document.write('<title>Registro da Pessoa</title></head>');  
            
            jan.document.write('<body><img src="../images/cabecalho2.png" alt="">'); 

            jan.document.write('<div style="height: 600px;margin: 20px">');
            jan.document.write('<h2>Registro da Pessoa </h2>');

            // <div style="height: 600px;overflow: scroll;" hidden>
            // <table class="table table-hover table-striped"

            jan.document.write('<br><strong> ID: </strong>' + id + '<br>');
            jan.document.write('<strong> NOME: </strong>' + nome + '<br>');
            jan.document.write('<strong> CARGO: </strong>' + cargo + '<br>');
            jan.document.write('<strong> E-MAIL: </strong>' + email + '<br>');
            jan.document.write('<strong> CPF: </strong>' + cpf + '<br>'); 
            jan.document.write('<strong> RG: </strong>' + rg + '<br>');
            jan.document.write('<strong> SEXO: </strong>' + sexo + '<br>');
            jan.document.write('<strong> DT NASC: </strong>' + dataNasci + '<br>');
            jan.document.write('<strong> CEP: </strong>' + cep + '<br>');
            jan.document.write('<strong> RUA: </strong>' + rua + '<br>');
            jan.document.write('<strong> NUMERO: </strong>' + numero + '<br>');
            jan.document.write('<strong> BAIRRO: </strong>' + bairro + '<br>');
            jan.document.write('<strong> COMPLEMENTO: </strong>' + comp + '<br>');
            jan.document.write('<strong> CIDADE: </strong>' + cidade + '<br>');
            jan.document.write('<strong> UF: </strong>' + uf + '<br>');                 
            jan.document.write('_______________________________________________');
            jan.document.write('</div>');
            jan.document.write('</div></html>');
            jan.document.close();
            jan.print()

        } else {
            Swal.fire("Opss ", "Selecione uma pessoa! ", "error");
        }
    } 
}