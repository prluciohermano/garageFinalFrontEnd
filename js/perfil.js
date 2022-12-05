const firstLog = JSON.parse(sessionStorage.getItem('token'));
localStorage.setItem('imgPerfil', JSON.stringify(""));

    
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
    const application = 'application/json'
    const Authorization = 'Authorization';
    method = 'Access-Control-Request-Method';
    head = 'Access-Control-Request-Headers';

    function buscarUsuario() {

        $.ajax({
            method : "GET",
            url : baseServidor + "/api/usuarios",
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,

            success : function(response) {

            $('#form-perfil> tbody > tr').remove();

            $("#id").val(response.id);

            for (var i = 0; i < response.length; i++) {
                
                $('#form-perfil> tbody')
                .append(
                    '<tr id="'+response[i].id+'"><td>'
                            + response[i].id
                            + '</td><td>'
                            + '<img src="'+ response[i].imagem +'" style="width: 40px">'
                            + '</td><td>'
                            + response[i].nomeUsuario                        						
                            + '</td><td><button type="button" class="btn btn-danger" onclick="deleteUsuario('
                            + response[i].id
                            + ')">Excluir</button></td></tr>');       
                    }
                    
                        }
                    }).fail(function(xhr, status, errorThrown) {
                Swal.fire("Opss ", "Erro ao buscar Usuaário! " + xhr.responseText, "error");
            });

    } buscarUsuario();


        function criarUsuario() {

            var nome = $("#nome").val();
            var login = $("#login").val();
            var senha = $("#senha").val();
            var admin = $("#isAdmin").val();
            var email = $("#email").val();

            var imgPerfil = JSON.parse(localStorage.getItem('imgPerfil'));

            if (nome && login && senha && email) {
            
                    $.ajax({
                        method : "POST",
                        url : baseServidor + "/api/usuarios",
                        dataType: "json",
                        headers : { Authorization : tokenNovo, Content : application },
                        async: true,
                        crossDomain : true,
            
                        data : JSON.stringify({
                            login: login,
                            senha: senha,
                            nome: nome,
                            admin: admin,
                            imagem : imgPerfil
            
                        }),
                        contentType : "application/json; charset=utf-8",
                        success : function(response) {
                            $("#id").val(response.id);
                            Swal.fire("Pronto!", "Usuário criado com sucesso!", "success");
                            
                            function DezSegundos(){
                                window.location.href = "perfil.html"
                            }
                            setTimeout(DezSegundos, 1000*2);
                            

                            
                        }  
            
                        }).fail(function(xhr, status, errorThrown) {
                        
                            Swal.fire("Opss ", "Erro ao salvar usuário! " + xhr.responseText, "error");
                        
                        });
                                            
                } else {

                   Swal.fire("Opss ", "Tu não acha que falta nada não?", "error");
                }
                
                
            }
        
            

        function apagaFormPerfil() {
            document.getElementById('id').value = "";
            document.getElementById('nome').value = "";
            document.getElementById('email').value = "";
            document.getElementById('login').value = "";
            document.getElementById('senha').value = "";
            document.getElementById('isAdmin').value = "";
            buscarUsuario();
        } 

        function deleteUsuario(id){
        
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
                        url : "http://localhost:8080/api/usuarios/" + id,
                        data : "id=" + id ,
                        dataType: "json",
                        headers : { Authorization : tokenNovo, Content : application },
                        async: true,
                        
                        crossDomain : true,
                        contentType : "application/json; charset=utf-8",

                        success : buscarUsuario()
                    }), 
                                
                    Swal.fire('Pronto!', 'Usuário foi deletado com sucesso.', 'success')
                    buscarUsuario();
                }

                }).fail(function(xhr, status, errorThrown) {
                    Swal.fire("Opss ", "Erro ao deletar pessoa. ", "error");
        })
        
    }

    var redimensionar = $('#perfil-img').croppie({
        enableExif: true,
        enableOrientation: true,

        viewport: {
            width: 340,
            height: 340,
            type: 'square',
            justifyContent: 'center'
            
        },

        boundary: {
            width: 380,
            height: 380,
            orientation: "center",
        }
    })

    $('#imagemPerfil').on('change', function() {
        var reader = new FileReader();

        reader.onload = function(e) {
            redimensionar.croppie('bind', {
                url: e.target.result
                
            })
            //document.querySelector("#preview-image").src = reader.result;
        }
        
        reader.readAsDataURL(this.files[0]);
    });

    $('.btn').on('click', function () {
        redimensionar.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (imagem) {

            const img = imagem;

            localStorage.setItem('imgPerfil', JSON.stringify(img));
            criarUsuario();
        })
        
    
    });

    
}



