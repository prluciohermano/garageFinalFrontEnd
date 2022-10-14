function pesquisarGaragem(buscaBox) {

        let html = "";

$.ajax({

    method : "GET",
    url : "http://localhost:8080/api/garage-box/nameBusca?numeroBox=" + buscaBox,
    data : "id=",
    async: true,
    crossDomain : true,
    success : function(response) {

        if (!response[0] == "") {
            
            html += '<div class="input-group mb-3">'
            html += '<span class="input-group-text" id="inputGroup-sizing-default">Box:</span>'
            html += '<input type="text" class="form-control" id="'+ response[0].numeroBox +'" value="' + response[0].numeroBox + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
            html += '</div>'

            html += '<div class="input-group mb-3">'
            html += '<span class="input-group-text" id="inputGroup-sizing-default">Placa:</span>'
            html += '<input type="text" class="form-control" id="'+ response[0].placaCar +'" value="' + response[0].produtoModel.placaCar + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
            html += '</div>'

            html += '<div class="input-group mb-3">'
            html += '<span class="input-group-text" id="inputGroup-sizing-default">Proprietário:</span>'
            html += '<input type="text" class="form-control" id="'+ response[0].nomeResp +'" value="' + response[0].produtoModel.pessoaModel.nome + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
            html += '</div>'

            html += '<div class="input-group mb-3">'
            html += '<span class="input-group-text" id="inputGroup-sizing-default">Defeito:</span>'
            html += '<input type="text" class="form-control" id="'+ response[0].defeitoCar +'" value="' + response[0].defeitoCar + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
            html += '</div>'

            html += '<div class="input-group mb-3">'
            html += '<span class="input-group-text" id="inputGroup-sizing-default">Mecânico:</span>'
            html += '<input type="text" class="form-control" id="'+ response[0].mecanicoCar +'" value="' + response[0].mecanicoCar + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
            html += '</div>'

            html += '<div class="input-group mb-3">'
            html += '<span class="input-group-text" id="inputGroup-sizing-default">Carro:</span>'
            html += '<input type="text" class="form-control" id="'+ response[0].produtoModel.descricao +'" value="' + response[0].produtoModel.descricao + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
            html += '</div>'

            html += '<div class="input-group mb-3">'
            html += '<span class="input-group-text" id="inputGroup-sizing-default">Ano:</span>'
            html += '<input type="text" class="form-control" id="'+ response[0].produtoModel.anoModelo +'" value="' + response[0].produtoModel.anoModelo + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
            html += '</div>'

            html += '<div class="input-group mb-3">'
            html += '<span class="input-group-text" id="inputGroup-sizing-default">Cor:</span>'
            html += '<input type="text" class="form-control" id="'+ response[0].produtoModel.corProduto +'" value="' + response[0].produtoModel.corProduto + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
            html += '</div>'

            html += '<div class="input-group mb-3">'
            html += '<span class="input-group-text" id="inputGroup-sizing-default">Data:</span>'
            html += '<input type="text" class="form-control" id="'+ response[0].produtoModel.dataEntrada +'" value="' + response[0].produtoModel.dataEntrada + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
            html += '</div>'

            html += '<div class="input-group mb-3">'
            html += '<span class="input-group-text" id="inputGroup-sizing-default">Valor:</span>'
            html += '<input type="text" class="form-control" id="'+ response[0].produtoModel.precoEntrada +'" value="' + response[0].produtoModel.precoEntrada + '" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">'
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