//TODO otimização do código em funções.

$(document).ready(function () {

    function limpa_form() {
        $("#inputAdress").val("");
        $("#inputNumber").val("");
        $("#inputNeighborhood").val("");
        $("#inputCity").val("");
        $("#inputState").val("");
    }

    function error_message(msg) {
        document.getElementById("msgerror").innerHTML = `<p class="text-danger mt-2">${msg}</p>`;
    }

    $("#inputCEP").blur(function () {

        var cep = $(this).val().replace(/\D/g, '');

        if (cep != "") {

            var validacep = /^[0-9]{8}$/;

            if (validacep.test(cep)) {

                $("#inputAdress").val("...");
                $("#inputNeighborhood").val("...");
                $("#inputCity").val("...");
                $("#inputState").val("...");

                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        error_message("");
                        $("#inputAdress").val(dados.logradouro);
                        $("#inputNeighborhood").val(dados.bairro);
                        $("#inputCity").val(dados.localidade);
                        $("#inputState").val(dados.uf);
                        document.querySelector("#inputNumber").removeAttribute("disabled");
                    }
                    else {
                        limpa_form();
                        error_message("CEP Inválido");
                    }
                });
            }
            else {
                limpa_form();
                error_message("CEP Inválido");
            }
        }
        else {

            limpa_form();
        }
    });
});