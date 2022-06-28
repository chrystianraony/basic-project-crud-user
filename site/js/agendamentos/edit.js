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
            schedule = response.data;
    
          if (!schedule) {
            throw new Error("Empty data");
          }
          document.querySelector("input#medico").value = schedule.medico;
          document.querySelector("input#paciente").value = schedule.paciente;
          document.querySelector("input#datetime").value = schedule.datetime;
          document.querySelector("input#observacao").value = schedule.observacao;
         
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
    