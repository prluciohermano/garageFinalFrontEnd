const firstLog = JSON.parse(sessionStorage.getItem('token'));
const baseServidor = "http://localhost:8080";
const tokenNovo = JSON.parse(sessionStorage.getItem('token'));
const Content = 'Content-Type';
const application = 'application/json'
const Authorization = 'Authorization';

if (firstLog == null) {
        location.href = "/login.html"
    } else {

    const fotoPerfil = JSON.parse(sessionStorage.getItem('fotoPerfil'));
    var tipo = document.getElementById('fotoPerfil');
    tipo.src = fotoPerfil;
    const nomePer = JSON.parse(sessionStorage.getItem('nomePer'));
    document.getElementById('nomePerfil').innerHTML = ("Usuário: " + nomePer);

        linhas();
        barras();
        //grafico3();
    
    function barras() {

        $.ajax({
            type: 'GET',
            url: baseServidor + "/api/servicos/meses",
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
            crossDomain : true,
            success: function (data) {

                var datas = [];
                var totais = [];

                for (var i = 0; i < data.length; i++) {

                const dataInput = (data[i].dataInicialServico);
                
                const date = new Date(dataInput);
                const dataFormatada = ((date.getDate() )) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear(); ;
                
                datas.push(dataFormatada);
                totais.push(data[i].total);

                }
                grafico(datas, totais);

            }
        });
    } 
    

    function grafico(datas, totais) {

        var ctx = document.getElementById('myChart').getContext('2d');

        var chart = new Chart(ctx, {

            type: 'bar',
            data: {
                labels: datas,
                
                
                datasets: [{
                    label: 'VALOR DO SERVIÇO POR DIA',
                    backgroundColor: ['green'],
                    borderColor: 'rgb(255, 99, 132)',
                    data: totais
                }]
            },

            options: { scales: { yAxes: [{ ticks: { beginAtZero: true }}] } }
        });

    }

    

    function linhas() { // Preço veiculos disponíveis - 2

        $.ajax({
            type: 'GET',
            url: baseServidor + "/api/veiculos/",
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,

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

    } 

    function grafico2(carros, precos) {

        const ctx = document.getElementById('myChart2').getContext('2d');

        new Chart(ctx, {

            type: 'line',
            data: {
                labels: carros,
                
                
                datasets: [{
                    label: 'VALOR DO VEÍCULO',
                    backgroundColor: ['gray', 'green'],
                    borderColor: 'rgb(200, 199, 60)',
                    data: precos,
                    borderWidth: 3
                }]
            },
            options: {
                scales: {
                    yAxes: {
                         beginAtZero: true
                    }
                }
            }
        });
    };

    function pesquisarVeiculo() {

        var veiculoEntrada = [];
        var dias = [];

        $.ajax({
        
            method : "GET",
            url : baseServidor + "/api/veiculos/",
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,
            success : function(response) {
            
                for (var key in response) {
                    
                    const dataInput = (response[key].dataEntrada);
                    veiculoEntrada.push(response[key].descricao);
        
                    const datehoje = new Date();
        
                    const d1 = dataInput;
                    const d2 = datehoje;
                    const diffInMs   = new Date(d2) - new Date(d1)
                    dias.push(Math.trunc(diffInMs / (1000 * 60 * 60 * 24)));      
                    
                }
              
                grafico3(veiculoEntrada, dias);
                
            }
            
                }).fail(function(xhr, status, errorThrown) {
                alert("Erro ao pesquisar um Produto: " + xhr.responseText);
            });

           
            
        }   pesquisarVeiculo();
    

    function grafico3(veiculoEntrada, dias) {

        var ctx = document.getElementById('myChart3').getContext('2d');

        var chart = new Chart(ctx, {
            
            type: 'pie',
            data: {
                labels: veiculoEntrada,
                
                datasets: [{
                    label: '',
                    backgroundColor: ['#20B2AA', '#F4A460', '#6495ED', '#DB7093', '#F0E68C', '#C71585', '#808080', '#C0C0C0'],
                    borderColor: ['green', 'orange', 'blue', 'red', 'yellow', 'purple', 'gray', 'silver'],
                    data: dias

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
}

