function validarFormulario(campos, data) {
  let valido = true;
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

  debugger
  if (!validarFormulario) {
    return;
  }

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
