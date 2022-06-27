const initFn = (e) => {
  let table = document.querySelector("tbody#tabelaTeste");

  axios.get("http://localhost:8080/pacientes").then((response) => {
    pacientes = response.data;
    console.log(pacientes);
    pacientes.forEach((paciente) => {
      let tr = document.createElement("tr");
      tr.innerHTML = ` 
            <td>${paciente.nome}</td> 
            <td>${paciente.cpf}</td>
            <td>${paciente.telefone}</td> 
            <td>${paciente.email}</td>
            <td>${paciente.sexo}</td>                                                              
            <td>${paciente.idade}</td>                                                              
            <td class="acoes">
                <a href="visualizar.html?id=${paciente.id}" id="visualizar" class="btn btn-show">
                <span class="mdi mdi-eye"></span>
                </a>
                <a href="edit.html?id=${paciente.id}" id="editar" class="btn btn-edit">
                <span class="mdi mdi-lead-pencil"></span>
                </a>
                <button class="btn btn-delete" type="button" onClick="excluirPaciente(event, ${paciente.id})">
                <span class="mdi mdi-trash-can-outline"></span>
                </button>
            
            </td>`;

      table.appendChild(tr);
    });
  });
};

function excluirPaciente(event, id) {
  event.preventDefault();

  Swal.fire({
    title: "Deletar paciente?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Excluir",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:8080/pacientes/${id}`)
        .then((data) => {
          Swal.fire("Excluido!", "", "success").then((result) => {
            window.location = "/pacientes/";
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
}
