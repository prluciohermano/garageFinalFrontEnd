function logar(){
    var login = document.getElementById('username').value
    var senha = document.getElementById('password').value

console.log(JSON.stringify({
    login: login,
    senha: senha
}));

    fetch("http://localhost:8080/api/usuarios/auth",{
        method:'POST',
        body: JSON.stringify({
            login: login,
            senha: senha
        }), 
        headers: { "Content-Type" : "application/json" },
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY2ODc4NTMxMH0.8U1AP4fVRcd4mPI0q4YQ8TnasKczaKsDZpiQJQ18Y_o',
        
        
    })

    .then(async (resp) => {
        var status = await resp.text();
        console.log(status)
        if(status == 'conectado' ){
            location.href = '/views/dashboard.html'
        } else {
            alert('nome e senha invalidos!!')
        }
        
    });

}