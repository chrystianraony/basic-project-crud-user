function validarFormulario(campos, data) {
    let valido = true;
  
    if (data.nome == "") {
      campos.nome.parentElement.classList.add("required");
      valido = false;
    } else {
      campos.nome.parentElement.classList.remove("required");
    }

    if (data.crm == "") { // CRM
      campos.crm.parentElement.classList.add("required");
      valido = false;
    } else {
      campos.crm.parentElement.classList.remove("required");
    }

    if (data.especializacao == "") { // ESPECIALIZACAO
      campos.especializacao.parentElement.classList.add("required");
      valido = false;  
    } else {
      campos.especializacao.parentElement.classList.remove("required");
    }

    if (data.telefone == "") { //TELEFONE
      campos.telefone.parentElement.classList.add("required");
      valido = false;
    } else {
      campos.telefone.parentElement.classList.remove("required");
    }

    if (data.email == "") {
    campos.email.parentElement.classList.add("required");
    valido = false;
    } else {
    campos.email.parentElement.classList.remove("required");
  }

  
    return valido;
  }
  function cadastrarMedico(event) {
    event.preventDefault();
  
    const campos = {
      nome: document.getElementById("nome"),
      crm: document.getElementById("crm"),
      especializacao: document.getElementById("especializacao"),
      telefone: document.getElementById("telefone"),
      email: document.getElementById("email"),
    };
  
    const data = {
      nome: campos.nome.value.trim(),
      crm: campos.crm.value.trim(),
      especializacao: campos.especializacao.value.trim(),
      telefone: campos.telefone.value.trim(),
      email: campos.email.value.trim(),
    };
  
    if (!validarFormulario(campos, data)) {
      return;
    }
    axios
  .post("http://localhost:8080/medicos", data)
  .then(function (response) {
    // manipula o sucesso da requisição
    console.log(response);
    console.log("chegou");
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Médico Cadastrado com Sucesso!",
      showConfirmButton: false,
      timer: 1500,
    }).then((result) => {
      window.location = "/medicos/index.html";
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
