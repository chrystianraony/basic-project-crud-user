function validarFormulario(campos, data) {
  let valido = true;

  if (data.nome == "") {
    campos.nome.parentElement.classList.add("required");
    valido = false;
  } else {
    campos.nome.parentElement.classList.remove("required");
  }

  return valido;
}

function cadastrarCargo(event) {
  console.log(event);
  event.preventDefault();

  const campos = {
    nome: document.getElementById("nome"),
  };

  const data = {
    nome: campos.nome.value.trim(),
  };

  if (!validarFormulario(campos, data)) {
    return;
  }

  axios
  .post("http://localhost:8080/cargos", data)
  .then(function (response) {
    // manipula o sucesso da requisição
    console.log(response);
    console.log("hahaha");
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Cargo Cadastrado com Sucesso!",
      showConfirmButton: false,
      timer: 1500,
    }).then((result) => {
      window.location = "/cargos/index.html";
    });
  })
  .catch(function (error) {
    // manipula erros da requisição
    console.error(error);
  })
  .then(function () {
    // sempre será executado
  });
}




