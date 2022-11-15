
$('document').ready(function () {

    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/api/servicos/meses",
        dataType: 'json',
        success: function (data) {

            var datas = [];
            var totais = [];

            for (var i = 0; i < data.length; i++) {

            const dataInput = (data[i].dataInicialServico);
            const dataCerta = new Date(dataInput);
            dataFormatada = dataCerta.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
            

            datas.push(dataFormatada);
            totais.push(data[i].total);

            }
            grafico(datas, totais);

        }
    });
})
 

function grafico(datas, totais) {

    var ctx = document.getElementById('myChart').getContext('2d');

    var chart = new Chart(ctx, {

        type: 'bar',
        data: {
            labels: datas,
            
            
            datasets: [{
                label: 'RELATÓRIO VALOR DE SERVIÇO POR DIA',
                backgroundColor: ['green'],
                borderColor: 'rgb(255, 99, 132)',
                data: totais
            }]
        },

        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}


$('document').ready(function () { // Preço veiculos disponíveis

    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/api/veiculos/",
        dataType: 'json',
        success: function (data) {

            var carros = [];
            var precos = [];

            for (var i = 0; i < data.length; i++) {

            carros.push(data[i].descricao);
            precos.push(data[i].precoEntrada);

            }
            grafico2(carros, precos);

        }
    });
})


function grafico2(carros, precos) {

    var ctx = document.getElementById('myChart2').getContext('2d');

    var chart = new Chart(ctx, {

        type: 'line',
        data: {
            labels: carros,
            
            
            datasets: [{
                label: 'RELATÓRIO DE VALOR VEÍCULOS',
                backgroundColor: ['gray', 'green'],
                borderColor: 'rgb(255, 99, 132)',
                data: precos
            }]
        },

        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

var ctx = document.getElementById('myChart3').getContext('2d');

var chart = new Chart(ctx, {
    
    type: 'pie',
    data: {
        labels: ['Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro'],
        
        
        datasets: [{
            label: 'RELATÓRIO NÚMERO DE CARROS VENDIDOS',
            backgroundColor: ['#20B2AA', '#F4A460', '#6495ED', '#DB7093', '#F0E68C', '#C71585', '#808080', '#C0C0C0'],
            borderColor: ['green', 'orange', 'blue', 'red', 'yellow', 'purple', 'gray', 'silver'],
            data: [3, 2, 1, 3, 5, 4, 1, 6]
        }]
    },

    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

// $('document').ready(function () { // PIZZA

//     $.ajax({
//         type: 'GET',
//         url: "http://localhost:8080/api/pessoas",
//         dataType: 'json',
//         success: function (data) {

//             var clientes = [];
//             var estados = [];
//             var quantEstado = null;

//             for (var i = 0; i < data.length; i++) {

//             clientes.push(data[i].nome);
//             estados.push(data[i].uf);

//             }
//             grafico3(clientes, estados);
//             console.log(estados);
//         }
//     });
// })


// function grafico3(clientes, estados) {

//     var ctx = document.getElementById('myChart3').getContext('2d');

//     var chart = new Chart(ctx, {
        
//         type: 'pie',
//         data: {
//             labels: estados,
            
            
//             datasets: [{
//                 label: 'RELATÓRIO CLIENTES POR ESTADO',
//                 backgroundColor: ['#20B2AA', '#F4A460', '#6495ED', '#DB7093', '#F0E68C', '#C71585'],
//                 borderColor: ['green', 'orange', 'blue', 'red', 'yellow', 'purple'],
//                 data: clientes
//             }]
//         },

//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true
//                     }
//                 }]
//             }
//         }
//     });
// }