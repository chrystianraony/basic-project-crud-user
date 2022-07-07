const initFn = (e, options = {nome: '', crm: '', especializacao: ''}) => {
  let table = document.querySelector("tbody#tabelaTeste");
  table.innerHTML = ""

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
  console.log(url)

  

  axios.get(url).then((response) => {
    medicos = response.data;
    const nomeSelect = document.querySelector(".nome-select");

    medicos.forEach((medico) => {
<<<<<<< HEAD
      var option = document.createElement("option");
      nomeSelect.nome = "nome"
      option.value = `${medico.nome}`;
      nomeSelect.value = option.value;
=======
      let option = document.createElement("option");
      option.value = `${medico.id}`;
>>>>>>> cde0ed123dbc0eeae8bb6854b70970a690acc5d2
      option.innerHTML = `${medico.nome}`;
      
      nomeSelect.appendChild(option)
    });

    
    new Choices(nomeSelect);
  });

  axios.get(url).then((response) => {
    medicos = response.data;
    const crmSelect = document.querySelector(".crm-select");

    medicos.forEach((medico) => {
<<<<<<< HEAD
      
      var option = document.createElement("option");
      crmSelect.id = "medico_id";
      option.value = `${medico.id}`;
      crmSelect.value = option.value;
      option.innerHTML = `${medico.crm}`;
      crmSelect.appendChild(option);


=======
      let option = document.createElement("option");
      option.value = `${medico.crm}`;
      option.innerHTML = `${medico.crm}`;

      crmSelect.appendChild(option)
>>>>>>> cde0ed123dbc0eeae8bb6854b70970a690acc5d2
    });

    
    new Choices(crmSelect);
  });

  axios.get(url).then((response) => {
    medicos = response.data;
    const especializacaoSelect = document.querySelector(".especializacao-select");

    medicos.forEach((medico) => {
      let option = document.createElement("option");
      option.value = `${medico.especializacao}`;
      option.innerHTML = `${medico.especializacao}`;

      especializacaoSelect.appendChild(option)
    });

    
    new Choices(especializacaoSelect);
  });

  

  console.log(options)
  axios.get(url).then((response) => {
    medicos = response.data;

    if (medicos.length > 0) {
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
    } else {
      let tabelaMedicos = document.querySelector("table#tabela-medicos")
      let p = document.createElement("p")
      p.classList.add('text-center')
      p.innerText = "Nenhum dado encontrado."

      tabelaMedicos.after(p)
    }
  });
  
};
function filtrarMedico(event) {
  event.preventDefault();

  options = {
    nome: document.querySelector("select.nome-select"),
    crm: document.querySelector("select.crm-select"),
    especializacao: document.querySelector("select.especializacao-select")
  }


<<<<<<< HEAD
  console.log(options)
=======
  medico_id = document.querySelector("select.nome-select").value,
  crm = document.querySelector("select.crm-select").value,
  especializacao = document.querySelector("select.especializacao-select").value,

  options = {}
  
  if (medico_id) options.medico_id =  medico_id
  if (crm) options.crm = crm
  if (especializacao) options.especializacao = especializacao 

  initFn(event, options)  
>>>>>>> cde0ed123dbc0eeae8bb6854b70970a690acc5d2
}


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
