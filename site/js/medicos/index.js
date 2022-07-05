const initFn = (e, options = { nome: 'top' }) => {
  let table = document.querySelector("tbody#tabelaTeste");

  // capturar os campos de filtros e passar na URL
  let url = "http://localhost:8080/medicos";

  keys = Object.keys(options);

  if (keys.length > 0) {
    url += "?";

    keys.forEach((key) => {
      url += `${key}=${options[key]}`;

      if (keys.indexOf(key) !== keys.length - 1) {
        url += "&";
      }
    });
  }

    nomeSelect = document.querySelector("select.nome-select"),
    crmSelect = document.querySelector("select.crm-select"),
    especSelect = document.querySelector("select.especializacao-select"),
    

  axios.get(url).then((response) => {
    medicos = response.data;
    medicos.forEach((medico) => {
      var option = document.createElement("option");
      nomeSelect.id = "medico_id";
      option.value = `${medico.id}`;
      nomeSelect.value = option.value;
      option.innerHTML = `${medico.nome}`;
      nomeSelect.appendChild(option);
    });

    const eMedico = document.querySelector(".nome-select");
    new Choices(eMedico);
  });

  axios.get(url).then((response) => {
    medicos = response.data;
    medicos.forEach((medico) => {
      var option = document.createElement("option");
      crmSelect.id = "medico_id";
      option.value = `${medico.id}`;
      crmSelect.value = option.value;
      option.innerHTML = `${medico.crm}`;
      crmSelect.appendChild(option);
    });

    const eMedico = document.querySelector(".crm-select");
    new Choices(eMedico);
  });

  axios.get(url).then((response) => {
    medicos = response.data;
    medicos.forEach((medico) => {
      var option = document.createElement("option");
      especSelect.id = "medico_id";
      option.value = `${medico.id}`;
      especSelect.value = option.value;
      option.innerHTML = `${medico.especializacao}`;
      especSelect.appendChild(option);
    });

    const eMedico = document.querySelector(".especializacao-select");
    new Choices(eMedico);
  });

  console.log(url);

  axios.get(url).then((response) => {
    medicos = response.data;
    medicos.forEach((medico) => {
      let tr = document.createElement("tr");
      tr.innerHTML = ` 
            <td>${medico.nome}</td> 
            <td>${medico.crm}</td>
            <td>${medico.especializacao}</td> 
            <td>${medico.telefone}</td>
            <td>${medico.email}</td>                                                              
            <td class="acoes">
                <a href="view.html?id=${medico.id}" id="visualizar" class="btn btn-show">
                <span class="mdi mdi-eye"></span>
                </a>
                <a href="edit.html?id=${medico.id}" id="editar" class="btn btn-edit">
                <span class="mdi mdi-lead-pencil"></span>
                </a>
                <button class="btn btn-delete" type="button" onclick="excluirMedico(event, ${medico.id})">
                <span class="mdi mdi-trash-can-outline"></span>
                </button>
            
            </td>`;

      table.appendChild(tr);
    });
  });

};

// function filtrarMedico(event) {
//   options = {

//   }
// }

function excluirMedico(event, id) {
  console.log(event);
  event.preventDefault();

  Swal.fire({
    title: "Deletar Médico?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Excluir",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:8080/medicos/${id}`)
        .then((data) => {
          Swal.fire("Excluido!", "", "success").then((result) => {
            window.location = "/medicos/";
          });
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  });
}
