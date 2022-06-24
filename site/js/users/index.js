const initFn = (e) => {
    let table = document.querySelector("tbody#tabelaTeste");

    axios.get("http://localhost:8080/users").then((response) => {
        users = response.data;
        console.log(users)
        users.forEach((user) => {
            let tr = document.createElement("tr");
            tr.innerHTML =
            //foi adicionado o cargo, mas tem que verificar se é necessário
                `<td>${user.nome}</td>
                <td>${user.cpf}</td>
                <td>${user.rg}</td>
                <td>${user.email}</td>                           
                <td>${user.cidade}</td>
                <td>${user.cargo_nome}</td>       
                <td class="acoes">
                    <a href="visualizar.html?id=${user.id}" id="visualizar" class="btn btn-show">
                    <span class="mdi mdi-eye"></span>
                    </a>
                    <a href="edit.html?id=${user.id}" id="editar" class="btn btn-edit">
                    <span class="mdi mdi-lead-pencil"></span>
                    </a>
                    <button class="btn btn-delete" type="button" onclick="excluirUsuario(event, ${user.id})">
                    <span class="mdi mdi-trash-can-outline"></span>
                    </button>
                
                </td>`;

            table.appendChild(tr);
        });
    });
}

function excluirUsuario(event, id) {
    console.log(event);
    event.preventDefault();

    Swal.fire({
      title: "Deletar usuário?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Excluir",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/users/${id}`)
          .then((data) => {
            Swal.fire("Excluido!", "", "success").then((result) => {
              window.location = "/users/";
            });
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      }
    });
}
