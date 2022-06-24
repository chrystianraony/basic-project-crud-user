function validarFormulario(campos, data) {
  let valido = true;

  if (data.nome == "") {
    campos.nome.parentElement.classList.add("required");
    valido = false;
  } else {
    campos.nome.parentElement.classList.remove("required");
  }

  return valido;
}

function atualizarUsuario(event) {
  event.preventDefault();

  const campos = {
    nome: document.getElementById("nome"),
  };

  const data = {
    nome: campos.nome.value.trim(),
  };

  if (!validarFormulario(campos, data)) {
    return;
  }

  console.log(data);
  Swal.fire({
    title: "Atualizar Cargo?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Atualizar",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .put(`http://localhost:8080/cargos/${params.id}`, data)
        .then(async function (response) {
          await Swal.fire({
            position: "center",
            icon: "success",
            title: "Dados atualizados",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log("Success:", data);
          window.location.href = "index.html";
        })
        .catch(function (error) {
          console.log("Error:", error);
          window.location.href = "index.html";
        });
    }
  });
}

const initFn = (e) => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  axios
    .get(`http://localhost:8080/cargos/${params.id}`)
    .then(function (response) {
      let data = response.data;
      if (!data) {
        throw new Error("Empty data");
      }
      document.querySelector("input#nome").value = data.nome;
    })
    .catch(function (error) {
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível encontrar o Cargo fornecido.",
        icon: "error",
        confirmButtonText: "Fechar",
      }).then(function (result) {
        window.location.href = "/medicos/";
      });
    });
};
