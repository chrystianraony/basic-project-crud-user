let med = null;

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

function atualizarAgendamento(event) {
  event.preventDefault();

  const campos = {
    medico: document.getElementById("medico_id"),
    paciente: document.getElementById("paciente_id"),
    datetime: document.getElementById("datetime"),
    observacao: document.getElementById("observacao"),
  };

  const data = {
    medico: campos.medico.value.trim(),
    paciente: campos.paciente.value.trim(),
    datetime: campos.datetime.value.trim(),
    observacao: campos.observacao.value.trim(),
  };

  if (!validarFormulario(campos, data)) {
    return;
  }
  console.log(data);
  Swal.fire({
    title: "Atualizar Agendamento?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Atualizar",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .put(`http://localhost:8080/agendamentos/${params.id}`, data)
        .then(async function (response) {
          await Swal.fire({
            position: "center",
            icon: "success",
            title: "Dados atualizados",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log("Success:", data);
          window.location.href = "/agendamentos/";
        })
        .catch(function (error) {
          console.log("Error:", error);
          window.location.href = "/agendamentos/";
        });
    }
  });
}

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const initFn = (e) => {

  axios
    .get(`http://localhost:8080/agendamentos/${params.id}`)
    .then(function (response) {

      let schedule = response.data;

      if (!schedule) {
        throw new Error("Empty data");
      }

      document.querySelector("#datetime").value = schedule.datetime;
      document.querySelector("#observacao").value = schedule.observacao;

      
      // carrega os medicos
      let medicoSelect = document.querySelector("select.medico-select");
      axios.get("http://localhost:8080/medicos").then((response) => {
        medicos = response.data;
        
        medicos.forEach((medico) => {
          var option = document.createElement("option");
          
          option.innerHTML = `${medico.nome}`;
          option.value = `${medico.id}`;
          
          if (schedule.medico_id == medico.id) {
            option.selected = true;
          }
          
          medicoSelect.appendChild(option);
        });
        
        const eMedico = document.querySelector(".medico-select");
        new Choices(eMedico);
      });
      //Fim dos medicos
      
      // carrega os pacientes
      let pacienteSelect = document.querySelector("select.paciente-select");
      axios.get("http://localhost:8080/pacientes").then((response) => {
        pacientes = response.data;
        pacientes.forEach((paciente) => {
          var option = document.createElement("option");

          option.innerHTML = `${paciente.nome}`;
          option.value = `${paciente.id}`;

          if(schedule.paciente_id == paciente.id) {
            option.selected = true;
          }

          pacienteSelect.appendChild(option);

        });

        const ePaciente = document.querySelector(".paciente-select");
        new Choices(ePaciente);
      });
      //Fim dos pacientes

      
    })
    .catch(function (error) {
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível encontrar seu agendamento.",
        icon: "error",
        confirmButtonText: "Fechar",
      }).then(function (result) {
        window.location.href = "/agendamentos/";
      });
    });
};
