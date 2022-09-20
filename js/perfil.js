$(function() {

    $("#form-perfil").submit(function (e) {
        e.preventDefault();
    }).validate({
        rules: {
            name: {
                required: true
            },
            cpf: {
                required: true
            },
            email: {
                required: true,
                email: true
            }
        },
        submitHandler: function (form) {
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Os dados foram salvos com sucesso!',
                showConfirmButton: false,
                timer: 1500
            })           
        }
    });
})