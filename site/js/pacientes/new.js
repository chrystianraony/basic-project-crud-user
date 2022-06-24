function validarFormulario(campos, data) {
  let valido = true;

  if (data.nome == "") {
    campos.nome.parentElement.classList.add("required");
    valido = false;
  } else {
    campos.nome.parentElement.classList.remove("required");
  }

  if (data.cpf == "") {
    campos.cpf.parentElement.classList.add("required");
    valido = false;
  } else if (!/\d{3}\.?\d{3}\.?\d{3}-?\d{2}/.test(data.cpf)) {
    Swal.fire({
      title: "Erro!",
      text: "CPF inválido.",
      icon: "error",
      confirmButtonText: "Fechar",
    });
    valido = false;
  } else {
    campos.cpf.parentElement.classList.remove("required");
  }

  if (data.telefone == "") {
    campos.telefone.parentElement.classList.add("required");
    valido = false;
  } else {
    campos.telefone.parentElement.classList.remove("required");
  }

  if (data.email == "") {
    campos.email.parentElement.classList.add("required");
    valido = false;
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    Swal.fire({
      title: "Erro!",
      text: "Email inválido.",
      icon: "error",
      confirmButtonText: "Fechar",
    });
    valido = false;
  } else {
    campos.email.parentElement.classList.remove("required");
  }

  if (data.sexo == "") {
    campos.sexo.parentElement.classList.add("required");
    valido = false;
  } else {
    campos.sexo.parentElement.classList.remove("required");
  }

  if (data.idade == "") {
    campos.idade.parentElement.classList.add("required");
    valido = false;
  } else {
    campos.idade.parentElement.classList.remove("required");
  }

  return valido;
}

function cadastrarPaciente(event) {
  event.preventDefault();

  const campos = {
    nome: document.getElementById("nome"),
    cpf: document.getElementById("cpf"),
    telefone: document.getElementById("telefone"),
    email: document.getElementById("email"),
    sexo: document.getElementById("sexo"),
    idade: document.getElementById("idade"),
  };

  const data = {
    nome: campos.nome.value.trim(),
    cpf: campos.cpf.value.trim(),
    telefone: campos.telefone.value.trim(),
    email: campos.email.value.trim(),
    sexo: campos.sexo.value.trim(),
    idade: campos.idade.value.trim(),
  };

  if (!validarFormulario(campos, data)) {
    return;
  }

  axios
    .post("http://localhost:8080/pacientes", data)
    .then(function (response) {
      console.log(response);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Paciente Cadastrado com Sucesso!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        window.location = "/pacientes/";
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
