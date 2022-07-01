function validarFormulario(campos, data) {
  let valido = true;

  if (data.medico_id == "") {
    campos.medico_id.parentElement.classList.add("required");
    valido = false;
  } else {
    campos.medico_id.parentElement.classList.remove("required");
  }

  if (data.paciente_id == "") {
    campos.paciente_id.parentElement.classList.add("required");
    valido = false;
  } else {
    campos.paciente_id.parentElement.classList.remove("required");
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
    medico_id: document.getElementById("medico_id"),
    paciente_id: document.getElementById("paciente_id"),
    datetime: document.getElementById("datetime"),
    observacao: document.getElementById("observacao"),
  };

  const data = {
    medico_id: campos.medico_id.value.trim(),
    paciente_id: campos.paciente_id.value.trim(),
    datetime: campos.datetime.value.trim(),
    observacao: campos.observacao.value.trim(),
  };

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

const initFn = (e) => {
  let medicoSelect = document.querySelector("select.medico-select");
  let pacienteSelect = document.querySelector("select.paciente-select");

  axios.get("http://localhost:8080/medicos").then((response) => {
    medicos = response.data;
    medicos.forEach((medico) => {
      var option = document.createElement("option");
      medicoSelect.id = "medico_id";
      option.value = `${medico.id}`;
      medicoSelect.value = option.value;
      option.innerHTML = `${medico.nome}`;
      medicoSelect.appendChild(option);
    });

    
    const eMedico = document.querySelector(".medico-select");
    new Choices(eMedico) ;
  });

  axios.get("http://localhost:8080/pacientes").then((response) => {
    pacientes = response.data;
    pacientes.forEach((paciente) => {
      var option = document.createElement("option");
      pacienteSelect.id = "paciente_id";
      option.value = `${paciente.id}`;
      pacienteSelect.value = option.value;
      option.innerHTML = `${paciente.nome}`;
      pacienteSelect.appendChild(option);
    });

    const ePaciente = document.querySelector(".paciente-select");
    new Choices(ePaciente);
  });
};
