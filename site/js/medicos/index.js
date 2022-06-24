const initFn = (e) => {
    let table = document.querySelector("tbody#tabelaTeste");

    axios.get("http://localhost:8080/medicos").then((response) => {
    users = response.data;
    users.forEach((medicos) => {
        let tr = document.createElement("tr");
      tr.innerHTML = ` 
            <td>${medicos.nome}</td> 
            <td>${medicos.crm}</td>
            <td>${medicos.especializacao}</td> 
            <td>${medicos.telefone}</td>
            <td>${medicos.email}</td>                                                              
            <td class="acoes">
                <a href="view.html?id=${medicos.id}" id="visualizar" class="btn btn-show">
                <span class="mdi mdi-eye"></span>
                </a>
                <a href="edit.html?id=${medicos.id}" id="editar" class="btn btn-edit">
                <span class="mdi mdi-lead-pencil"></span>
                </a>
                <button class="btn btn-delete" type="button" onclick="excluirMedico(event, ${medicos.id})">
                <span class="mdi mdi-trash-can-outline"></span>
                </button>
            
            </td>`;

      table.appendChild(tr);
    });
});
};

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
  