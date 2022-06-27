let paciente = null;

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

function atualizarPaciente(event) {
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
  console.log(data);
  Swal.fire({
    title: "Atualizar Paciente?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Atualizar",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .put(`http://localhost:8080/pacientes/${params.id}`, data)
        .then(async function (response) {
          await Swal.fire({
            position: "center",
            icon: "success",
            title: "Dados atualizados",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log("Success:", data);
          window.location.href = "/pacientes/";
        })
        .catch(function (error) {
          console.log("Error:", error);
          window.location.href = "/pacientes/";
        });
    }
  });
}

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const initFn = (e) => {
  axios
    .get(`http://localhost:8080/pacientes/${params.id}`)
    .then(function (response) {
      paciente = response.data;

      if (!paciente) {
        throw new Error("Empty data");
      }

      document.querySelector("input#nome").value = paciente.nome;
      document.querySelector("input#cpf").value = paciente.cpf;
      document.querySelector("input#telefone").value = paciente.telefone;
      document.querySelector("input#email").value = paciente.email;
      document.querySelector("input#sexo").value = paciente.sexo;
      document.querySelector("input#idade").value = paciente.idade;
    })
    .catch(function (error) {
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível encontrar o usuário fornecido.",
        icon: "error",
        confirmButtonText: "Fechar",
      }).then(function (result) {
        window.location.href = "/pacientes/";
      });
    });
};
