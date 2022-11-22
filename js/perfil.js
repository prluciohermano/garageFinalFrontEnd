const firstLog = JSON.parse(sessionStorage.getItem('token'));
    
if (firstLog == null) {
        location.href = "/login.html"
    } else {

    const baseServidor = "http://localhost:8080";
    const tokenNovo = JSON.parse(sessionStorage.getItem('token'));
    const Content = 'Content-Type';
    const application = 'application/json'
    const Authorization = 'Authorization';
    method = 'Access-Control-Request-Method';
    head = 'Access-Control-Request-Headers';

    // const photoFile = document.getElementById('photo-file')
    // let photoPreview = document.getElementById('photo-preview')
    // let image;
    // let photoName;

    // // Select & Preview image
    // document.getElementById('select-image')
    // .onclick = function() {
    //     photoFile.click()
    // }

    // window.addEventListener('DOMContentLoaded', () =>{
    //     photoFile.addEventListener('change', () => {
    //         let file = photoFile.files.item(0)
    //         photoName = file.name;

    //         // ler um arquivo
    //         let reader = new FileReader()
    //         reader.readAsDataURL(file)
    //         reader.onload = function(event) {
    //             image = new Image();
    //             image.src = event.target.result
    //             image.onload = onLoadImage
    //         }
    //     })
    // })

    // // Selection tool
    // const selection = document.getElementById('selection-tool')

    // let startX, startY, relativeStartX, relativeStartY,
    // endX, endY, relativeEndX, relativeEndY;
    // let startSelection = false;

    // const events = {
    //     mouseover(){
    //     this.style.cursor = 'crosshair'
    //     },
    //     mousedown(){
    //         const {clientX, clientY, offsetX, offsetY} = event
    //         // console.table({
    //         //     'client': [clientX, clientY],
    //         //     'offset': [offsetX, offsetY]
    //         // })

    //         startX = clientX
    //         startY = clientY
    //         relativeStartX = offsetX
    //         relativeStartY = offsetY

    //         startSelection = true

    //     },
    //     mousemove(){
    //         endX = event.clientX
    //         endY = event.clientY

    //         if(startSelection) {
    //             selection.style.display = 'initial';
    //             selection.style.top = startY + 'px';
    //             selection.style.left = startX + 'px';

    //             selection.style.width = (endX - startX) + 'px';
    //             selection.style.height = (endY - startY) + 'px';
    //         }

    //     },
    //     mouseup(){
    //         startSelection = false;

    //         relativeEndX = event.layerX;
    //         relativeEndY = event.layerY;

    //         // mostrar o botão de corte
    //         cropButton.style.display = 'initial'
    //     }
    // }

    // Object.keys(events)
    // .forEach(eventName => {
    //     // addEventListener('mouseover', events.mouseover)
    //     photoPreview.addEventListener(eventName, events[eventName])
    // })


    // // Canvas
    // let canvas = document.createElement('canvas')
    // let ctx = canvas.getContext('2d')

    // function onLoadImage() {
    //     const { width, height } = image
    //     canvas.width = width;
    //     canvas.height = height;

    //     // limpar o contexto
    //     ctx.clearRect(0, 0, width, height)

    //     // desenhar a imagem no contexto
    //     ctx.drawImage(image, 0, 0)

    //     photoPreview.src = canvas.toDataURL()
    // }

    // // Cortar imagem
    // const cropButton = document.getElementById('crop-image')
    // cropButton.onclick = () => {
    //     const { width: imgW, height: imgH } = image
    //     const { width: previewW, height: previewH } = photoPreview

    //     const [ widthFactor, heightFactor ] = [ 
    //         +(imgW / previewW), 
    //         +(imgH / previewH)
    //     ]

    //     const [ selectionWidth, selectionHeight ] = [
    //         +selection.style.width.replace('px', ''),
    //         +selection.style.height.replace('px', '')
    //     ]

    //     const [ croppedWidth, croppedHeight ] = [
    //         +(selectionWidth * widthFactor),
    //         +(selectionHeight * heightFactor)
    //     ]

    //     const [actualX, actualY] = [
    //         +( relativeStartX * widthFactor ),
    //         +( relativeStartY * heightFactor )
    //     ]

    //     // pegar do ctx a imagem cortada
    //     const croppedImage = ctx.getImageData(actualX, actualY, croppedWidth, croppedHeight)

    //     // limpar o ctx
    //     ctx.clearRect(0,0,ctx.width,ctx.height)

    //     // ajuste de proporções
    //     image.width = canvas.width = croppedWidth;
    //     image.height = canvas.height = croppedHeight;

    //     // adicionar a imagem cortada ao ctx
    //     ctx.putImageData(croppedImage, 0, 0)

    //     // esconder a ferramenta de seleção
    //     selection.style.display = 'none'

    //     // atualizar o preview da imagem
    //     photoPreview.src = canvas.toDataURL()

    //     // mostrar o botão de download
    //     downloadButton.style.display = 'initial'
    // }

    // // Download
    // const downloadButton = document.getElementById('download')
    // downloadButton.onclick = function() {
    //     const a = document.createElement('a')
    //     a.download = photoName + '-cropped.png';
    //     a.href = canvas.toDataURL();
    //     a.click()
    // }

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
        var imgPerfil = $("#imagemPerfil").val();

        // console.log(JSON.stringify ({
        //     login: login,
        //     senha: senha,
        //     nome: nome,
        //     admin: admin,
        //     imgPerfil : imgPerfil

        // }));

        $.ajax({
            method : "POST",
            url : baseServidor + "/api/usuarios",

            headers : { Authorization : tokenNovo,
            method : "*", head : "*"},
            async: true,
            crossDomain : true,

            data : JSON.stringify({
                login: login,
                senha: senha,
                nome: nome,
                admin: admin,
                imgPerfil : imgPerfil

            }),
            contentType : "application/json; charset=utf-8",
            success : function(response) {
                $("#id").val(response.id);

                apagaFormPerfil();
                buscarUsuario();
                Swal.fire("Pronto!", "Usuário criado com sucesso!", "success");
        
            }

            }).fail(function(xhr, status, errorThrown) {
                Swal.fire("Opss ", "Erro ao salvar usuário! " + xhr.responseText, "error");
            });
        buscarUsuario();
    }

    function apagaFormPerfil() {
        document.getElementById("form-perfil").reset();
        }

    function deleteUsuario(id){
        alert(id)
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

                    success : function(response) {
                    
                    buscarUsuario();

                    $('#'+ id).remove();
                    $("#form-perfil td").remove();
                   
                    Swal.fire("Pronto!", "Registro excluído com sucesso!", "success");	
                   
                    
                    }

                }), Swal.fire(
                'Deletado!',
                'Usuário foi deletado com sucesso.',
                'success'
            )
            }

            buscarUsuario();
        })

        
    } 
}