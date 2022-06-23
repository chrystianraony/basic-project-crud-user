let user = null;

function validarFormulario(campos, data) {
  let valido = true;

  if (data.nome == "") {
    campos.nome.parentElement.classList.add("required");
    valido = false;
  } else {
    campos.nome.parentElement.classList.remove("required");
  }

  if (data.cpf == "") {
    campos.cpf.parentElement.classList.add("required");
    valido = false;
  } else if (!/\d{3}\.?\d{3}\.?\d{3}-?\d{2}/.test(data.cpf)) {
    Swal.fire({
      title: "Erro!",
      text: "CPF inválido.",
      icon: "error",
      confirmButtonText: "Fechar",
    });
    valido = false;
  } else {
    campos.cpf.parentElement.classList.remove("required");
  }

  if (data.rg == "") {
    campos.rg.parentElement.classList.add("required");
    valido = false;
  } else {
    campos.rg.parentElement.classList.remove("required");
  }

  if (data.email == "") {
    campos.email.parentElement.classList.add("required");
    valido = false;
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    Swal.fire({
      title: "Erro!",
      text: "Email inválido.",
      icon: "error",
      confirmButtonText: "Fechar",
    });
    valido = false;
  } else {
    campos.email.parentElement.classList.remove("required");
  }

  if (data.cidade == "") {
    campos.cidade.parentElement.classList.add("required");
    valido = false;
  } else {
    campos.cidade.parentElement.classList.remove("required");
  }

  if (data.cargo_id == "") {
    campos.cargo_id.parentElement.classList.add("required");
    valido = false;
  } else {
    campos.cargo_id.parentElement.classList.remove("required");
  }

  return valido;
}

function atualizarUsuario(event) {
  event.preventDefault();

  const campos = {
    nome: document.getElementById("nome"),
    cpf: document.getElementById("cpf"),
    rg: document.getElementById("rg"),
    email: document.getElementById("email"),
    cidade: document.getElementById("cidade"),
    cargo_id: document.getElementById("cargo_id"),
  };

  const data = {
    nome: campos.nome.value.trim(),
    cpf: campos.cpf.value.trim(),
    rg: campos.rg.value.trim(),
    email: campos.email.value.trim(),
    cidade: campos.cidade.value.trim(),
    cargo_id: campos.cargo_id.value.trim(),
  };

  if (!validarFormulario(campos, data)) {
    return;
  }

  console.log(data);
  Swal.fire({
    title: "Atualizar Usuário?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Atualizar",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .put(`http://localhost:8080/users/${params.id}`, data)
        .then(async function (response) {
          await Swal.fire({
            position: "center",
            icon: "success",
            title: "Dados atualizados",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log("Success:", data);
          window.location.href = "/users/";
        })
        .catch(function (error) {
          console.log("Error:", error);
          window.location.href = "/users/";
        });
    }
  });
}

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const initFn = (e) => {
  axios
    .get(`http://localhost:8080/users/${params.id}`)
    .then(function (response) {
      // TODO REFATORAR DATA PARA USER
      user = response.data;

      if (!user) {
        throw new Error("Empty data");
      }
      document.querySelector("input#nome").value = user.nome;
      document.querySelector("input#cpf").value = user.cpf;
      document.querySelector("input#rg").value = user.rg;
      document.querySelector("input#email").value = user.email;
      document.querySelector("input#cidade").value = user.cidade;

      // Carrega os cargos no select input
      let select = document.querySelector("select.cargo");

      axios.get("http://localhost:8080/cargos").then((response) => {
        cargos = response.data;
        cargos.forEach((cargo) => {
          var option = document.createElement("option");

          option.innerHTML = `${cargo.nome}`;
          option.value = `${cargo.id}`;

          if (user.cargo_id == cargo.id) {
            option.selected = true;
          }

          select.appendChild(option);
        });
      });
    })
    .catch(function (error) {
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível encontrar o usuário fornecido.",
        icon: "error",
        confirmButtonText: "Fechar",
      }).then(function (result) {
        window.location.href = "/users/";
      });
    });
};
