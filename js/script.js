//TODO otimização do código em funções.

//masks
$('#inputCEP').mask('00000-000');

//array para salvar as informações
var clients = [];

//função para ativar ou desativar o input
function numberInput(activeOrNot) {
    document.querySelector("#inputNumber").disabled = activeOrNot;
}

//carregar os dados do array
loadClients();

function loadClients() {
    for (var cli of clients) {
        addNewRow(cli);
    }
}

//função para adicionar nova linha na table 
function addNewRow(cli) {
    //encontrando a tabela pelo id
    var table = document.getElementById("table");

    //variavel para a inserção de linhas   
    var newRow = table.insertRow();

    var idNode = document.createTextNode(cli.id);
    newRow.insertCell().appendChild(idNode);

    var completeNameNode = document.createTextNode(cli.name);
    newRow.insertCell().appendChild(completeNameNode);

    var adressNode = document.createTextNode(cli.adress);
    newRow.insertCell().appendChild(adressNode);

    var cepNode = document.createTextNode(cli.cep);
    newRow.insertCell().appendChild(cepNode);

    /*var numberNode = document.createTextNode(cli.number);
    newRow.insertCell().appendChild(numberNode);*/

    var neighborhoodNode = document.createTextNode(cli.neighborhood);
    newRow.insertCell().appendChild(neighborhoodNode);

    var cityNode = document.createTextNode(cli.city);
    newRow.insertCell().appendChild(cityNode);

    var stateNode = document.createTextNode(cli.state);
    newRow.insertCell().appendChild(stateNode);
}

//salvando informações no array e formatando o form
function saveInfo() {
    var cli = {
        id: clients.length + 1,
        name: document.getElementById("inputName").value + " " + document.getElementById("inputSecondName").value,
        adress: document.getElementById("inputAdress").value + ", " + document.getElementById("inputNumber").value,
        cep: document.getElementById("inputCEP").value,
        //number: document.getElementById("inputNumber").value,
        neighborhood: document.getElementById("inputNeighborhood").value,
        city: document.getElementById("inputCity").value,
        state: document.getElementById("inputState").value,
    };

    addNewRow(cli);
    clients.push(cli);

    document.getElementById("formulario").reset();
    numberInput(true);
}

$(document).ready(function () {

    function limpa_form() {
        $("#inputAdress").val("");
        $("#inputNumber").val("");
        $("#inputNeighborhood").val("");
        $("#inputCity").val("");
        $("#inputState").val("");
    }

    function setCep(dados) {
        $("#inputAdress").val(dados.logradouro);
        $("#inputNeighborhood").val(dados.bairro);
        $("#inputCity").val(dados.localidade);
        $("#inputState").val(dados.uf);
    }

    function error_message(msg) {
        document.getElementById("msgerror").innerHTML = `<p class="text-danger mt-2">${msg}</p>`;
    }

    function loadCep() {
        $("#inputAdress").val("...");
        $("#inputNeighborhood").val("...");
        $("#inputCity").val("...");
        $("#inputState").val("...");
    }

    //function para desativar btn - ajuste
    function turnOffButton(statusBtn) {
        $("#btnsubmit").prop("disabled", statusBtn);
    }

    $("#inputCEP").blur(function () {

        var cep = $(this).val().replace(/\D/g, '');

        if (cep != "") {

            var validacep = /^[0-9]{8}$/;

            if (validacep.test(cep)) {

                loadCep();

                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        error_message("");
                        //ajuste para ativar btn
                        turnOffButton(false);
                        setCep(dados);
                        numberInput(false);
                    }
                    else {
                        limpa_form();
                        error_message("CEP não encontrado");
                        //ajuste para desativar btn
                        turnOffButton(true);
                    }
                });
            }
            else {
                limpa_form();
                error_message("CEP Inválido");
                //ajuste para desativar btn
                turnOffButton(true);
            }
        }
        else {
            limpa_form();
        }
    });
});