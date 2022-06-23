
const initFn = (e) => {
  let table = document.querySelector("tbody#tabelaTeste");
  
  axios.get("http://localhost:8080/cargos").then((response) => {
    users = response.data;
    users.forEach((cargos) => {
      let tr = document.createElement("tr");
      tr.innerHTML = ` <td>${cargos.id}</td>
            <td>${cargos.nome}</td>                                                                
            <td class="acoes">
                <a href="visualizar.html?id=${cargos.id}" id="visualizar" class="btn btn-show">
                <span class="mdi mdi-eye"></span>
                </a>
                <a href="edit.html?id=${cargos.id}" id="editar" class="btn btn-edit">
                <span class="mdi mdi-lead-pencil"></span>
                </a>
                <button class="btn btn-delete" type="button" onclick="excluirUsuario(event, ${cargos.id})">
                <span class="mdi mdi-trash-can-outline"></span>
                </button>
            
            </td>`;

      table.appendChild(tr);
    });
  });
};

function excluirUsuario(event, id) {
  console.log(event);
  event.preventDefault();

  Swal.fire({
    title: "Deletar Cargo?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Excluir",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:8080/cargos/${id}`)
        .then((data) => {
          Swal.fire("Excluido!", "", "success").then((result) => {
            window.location = "/cargos/index.html";
          });
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  });
}
