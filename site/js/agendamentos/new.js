function validarFormulario(campos, data) {
  let valido = true;

  if (data.medico == "") {
    campos.medico.parentElement.classList.add("required");
    valido = false;
  } else {
    campos.medico.parentElement.classList.remove("required");
  }

  if (data.paciente == "") { 
    campos.paciente.parentElement.classList.add("required");
    valido = false;
  } else {
    campos.paciente.parentElement.classList.remove("required");
  }

  if (data.datetime == "") { 
    campos.datetime.parentElement.classList.add("required");
    valido = false;  
  } else {
    campos.datetime.parentElement.classList.remove("required");
  }

  if (data.observacao == "") { 
    campos.observacao.parentElement.classList.add("required");
    valido = false;
  } else {
    campos.observacao.parentElement.classList.remove("required");
  }

  return valido;
}

function cadastrarAgendamento(event) {
  event.preventDefault();

  const campos = {
    medico: document.getElementById("medico"),
    paciente: document.getElementById("paciente"),
    datetime: document.getElementById("datetime"),
    observacao: document.getElementById("observacao"),
  };

  const data = {
    medico: campos.medico.value.trim(),
    paciente: campos.paciente.value.trim(),
    datetime: campos.datetime.value.trim(),
    observacao: campos.observacao.value.trim(),
  };

  // debugger
  // if (!validarFormulario) {
  //   return;
  // }

  axios
    .post("http://localhost:8080/agendamentos", data)
    .then(function (response) {
      console.log(response);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Consulta agendada com Sucesso!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        window.location = "/agendamentos/";
      });
    })
    .catch(function (error) {
      // manipula erros da requisição
      console.error(error);
    });
}
