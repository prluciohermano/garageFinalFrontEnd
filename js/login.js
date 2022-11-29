    const baseServidor = "http://localhost:8080";
    const baseLogin = baseServidor + "/login";
    const baseUrl = baseServidor + "/api/usuarios/";
    const Content = 'Content-Type';
    const application = 'application/json;charset=UTF-8'
                
function entrar() { // usado para login

    const login = document.getElementById('login').value
    const senha = document.getElementById('senha').value

    sessionStorage.setItem('login', JSON.stringify(login));

    $.ajax({
        
        method : "POST",
        url : baseLogin,
        dataType: "json",
        async: true,
        crossDomain : true,
        header : { Content : application },
        data : JSON.stringify({ login:login, senha:senha }),
        
        success : function(response) {
            
            const tokenBanco = (response.Authorization);
            sessionStorage.setItem('token', JSON.stringify(tokenBanco));
            window.location = '/views/dashboard.html';

    }

    }).fail(function(xhr, status, errorThrown) {
        Swal.fire("Opss ", "Login e/ou Senha não conferem!", "error");
    });
} 


function mostrarSenha() {

    const password = document.querySelector('#senha');

        if (password.type === 'password') {
            password.type = 'text';
        } else {
            password.type = 'password';
        }
    
}

