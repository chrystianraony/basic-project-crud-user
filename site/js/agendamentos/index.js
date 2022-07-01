const initFn = (e) => {
  let table = document.querySelector("tbody#tabelaTeste");

  axios.get("http://localhost:8080/agendamentos").then((response) => {
    agendamentos = response.data;
    agendamentos.forEach((agendamento) => {
      let tr = document.createElement("tr");
      tr.innerHTML = ` 
            <td>${agendamento.nome}</td> 
            <td>${agendamento.paciente_nome}</td>
            <td>${agendamento.observacao}</td>
            <td>${agendamento.datetime}</td> 
            <td class="acoes">
                <a href="visualizar.html?id=${agendamento.id}" id="visualizar" class="btn btn-show">
                <span class="mdi mdi-eye"></span>
                </a>
                <a href="edit.html?id=${agendamento.id}" id="editar" class="btn btn-edit">
                <span class="mdi mdi-lead-pencil"></span>
                </a>
                <button class="btn btn-delete" type="button" onclick="excluirAgendamento(event, ${agendamento.id})">
                <span class="mdi mdi-trash-can-outline"></span>
                </button>
            </td>`;

      table.appendChild(tr);
    });
  });
};

function excluirAgendamento(event, id) {
  console.log(event);
  event.preventDefault();

  Swal.fire({
    title: "Deletar Agendamento?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Excluir",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:8080/agendamentos/${id}`)
        .then((data) => {
          Swal.fire("Excluido!", "", "success").then((result) => {
            window.location = "/agendamentos/";
          });
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  });
}
