const firstLog = JSON.parse(sessionStorage.getItem('token'));

if (firstLog == undefined) {
    location.href = "/login.html"
    } else {

    const baseServidor = "http://localhost:8080";
    const tokenNovo = JSON.parse(sessionStorage.getItem('token'));

    const application = 'application/json'
    method = 'Access-Control-Request-Method';
    head = 'Access-Control-Request-Headers';

    
    function pesquisarGaragem(buscaBox) {
        
        let html = "";
    
    $.ajax({

        method : "GET",
        url : baseServidor + "/api/garage-box/nameBusca?numeroBox=" + buscaBox,
        data : "id=",
        dataType: "json",
        headers : { Authorization : tokenNovo, Content : application },
        async: true,
        crossDomain : true,
        success : function(response) {

            console.log(response);
        
            if (!response[0] == "") {
                
                const dataInput = (response[0].veiculo.dataEntrada);
                const dataFormatada = new Date(dataInput).toLocaleString();
                
                const precoPuro = (response[0].veiculo.precoEntrada);
                const precoTop = (precoPuro.toLocaleString('pt-br', {minimumFractionDigits: 2}));
                
                
                html += '<div class="input-group mb-3">'
                html += '<span class="input-group-text" id="inputGroup-sizing-default">Box:</span>'
                html += '<input type="text" class="form-control" readonly="readonly" id="'+ response[0].numeroBox +'" value="' + response[0].numeroBox + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
                html += '</div>'

                html += '<div class="input-group mb-3">'
                html += '<span class="input-group-text" id="inputGroup-sizing-default">Placa:</span>'
                html += '<input type="text" class="form-control" readonly="readonly" id="'+ response[0].placaCar +'" value="' + response[0].veiculo.placaCar + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
                html += '</div>'

                html += '<div class="input-group mb-3">'
                html += '<span class="input-group-text" id="inputGroup-sizing-default">Proprietário:</span>'
                html += '<input type="text" class="form-control" readonly="readonly" id="'+ response[0].nomeResp +'" value="' + response[0].veiculo.pessoa.nome + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
                html += '</div>'

                html += '<div class="input-group mb-3">'
                html += '<span class="input-group-text" id="inputGroup-sizing-default">Defeito:</span>'
                html += '<input type="text" class="form-control" readonly="readonly" id="'+ response[0].defeitoCar +'" value="' + response[0].defeitoCar + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
                html += '</div>'

                html += '<div class="input-group mb-3">'
                html += '<span class="input-group-text" id="inputGroup-sizing-default">Mecânico:</span>'
                html += '<input type="text" class="form-control" readonly="readonly" id="'+ response[0].mecanicoCar +'" value="' + response[0].mecanicoCar + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
                html += '</div>'

                html += '<div class="input-group mb-3">'
                html += '<span class="input-group-text" id="inputGroup-sizing-default">Carro:</span>'
                html += '<input type="text" class="form-control" readonly="readonly" id="'+ response[0].veiculo.descricao +'" value="' + response[0].veiculo.descricao + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
                html += '</div>'

                html += '<div class="input-group mb-3">'
                html += '<span class="input-group-text" id="inputGroup-sizing-default">Ano:</span>'
                html += '<input type="text" class="form-control" readonly="readonly" id="'+ response[0].veiculo.anoModelo +'" value="' + response[0].veiculo.anoModelo + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
                html += '</div>'

                html += '<div class="input-group mb-3">'
                html += '<span class="input-group-text" id="inputGroup-sizing-default">Cor:</span>'
                html += '<input type="text" class="form-control" readonly="readonly" id="'+ response[0].veiculo.corVeiculo +'" value="' + response[0].veiculo.corVeiculo + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
                html += '</div>'

                html += '<div class="input-group mb-3">'
                html += '<span class="input-group-text" id="inputGroup-sizing-default">Data:</span>'
                html += '<input type="text" class="form-control" readonly="readonly" id="'+ dataFormatada +'" value="' + dataFormatada + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
                html += '</div>'

                html += '<div class="input-group mb-3">'
                html += '<span class="input-group-text" id="inputGroup-sizing-default">Valor:</span>'
                html += '<input type="text" class="form-control" readonly="readonly" id="'+ precoTop +'" value="' + precoTop + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
                html += '</div>'
            } else {
                    html += '<div class="input-group mb-3">'
                    html += '<span>Esse Box está vazio</span>'
                    html += '</div>'
                    }          
            $("#form-box").html(html);
        }
            }
                ).fail(function(xhr, status, errorThrown) {
            alert("Erro ao pesquisar um Produto: " + xhr.responseText);
        });
        
    }   

    function carregaBox() {

        $.ajax({
            
            method : "GET",
            dataType: "json",
            url : baseServidor + "/api/garage-box",
            headers : { Authorization : tokenNovo,
                        Content : application },
            async: true,
            crossDomain : true,
            
            success : function(response) {
                // token = xhr.responseText;
                //$("#preencheBoxes").append("<h4>Boxes Ocupados: </h4>")
            for (var i = 0; i < response.length; i++) {
                var idCat = response[i].id;
                var value = response[i].numeroBox;
                if (value != null && value.trim() != '') {

                    var heading = document.getElementById('title-div '+ value);
                    heading.style.backgroundColor = "rgba(245, 94, 94, 0.245)";
                    heading.style.color = "#ef5350";

                    document.getElementById('title-text '+ value).innerHTML = "Ocupado";
                }
            }

        }

        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Opss ", "Erro ao carregar Garage BOX " + xhr.responseText, "error");
        });

    } carregaBox();
    
} // do if

