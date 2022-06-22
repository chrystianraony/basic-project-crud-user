function validarFormulario(campos, data) {
    let valido = true;

    if (data.nome == "") {
      campos.nome.parentElement.classList.add("required")
      valido = false;
    } else {
      campos.nome.parentElement.classList.remove("required")
    }

    if (data.cpf == "") {
      campos.cpf.parentElement.classList.add("required")
      valido = false;
    } else if (! /\d{3}\.?\d{3}\.?\d{3}-?\d{2}/.test(data.cpf)) {
      Swal.fire({
          title: 'Erro!',
          text: 'CPF inválido.',
          icon: 'error',
          confirmButtonText: 'Fechar'
      })
      valido = false;
    } else {
      campos.cpf.parentElement.classList.remove("required")
    }

    if (data.rg == "") {
      campos.rg.parentElement.classList.add("required")
      valido = false;
    } else {
      campos.rg.parentElement.classList.remove("required")
    }

    if (data.email == "") {
      campos.email.parentElement.classList.add("required")
      valido = false;
    } else if (! /\S+@\S+\.\S+/.test(data.email)) {
      Swal.fire({
          title: 'Erro!',
          text: 'Email inválido.',
          icon: 'error',
          confirmButtonText: 'Fechar'
      })
      valido = false;
    } else {
      campos.email.parentElement.classList.remove("required")
    }

    if (data.cidade == "") {
      campos.cidade.parentElement.classList.add("required")
      valido = false;
    } else {
      campos.cidade.parentElement.classList.remove("required")
    }

    return valido;
  }

  function cadastrarUsuario(event){
    console.log(event)
    event.preventDefault();

    const campos = {
      nome: document.getElementById("nome"),
      cpf: document.getElementById("cpf"),
      rg: document.getElementById("rg"),
      email: document.getElementById("email"),
      cidade: document.getElementById("cidade"),
      cargo_id: document.getElementById("cargo_id"),
    }


    const data = {
      nome: campos.nome.value.trim(),
      cpf: campos.cpf.value.trim(),
      rg: campos.rg.value.trim(),
      email: campos.email.value.trim(),
      cidade: campos.cidade.value.trim(),
      cargo_id: campos.cargo_id.value.trim(),
    }

    if (!validarFormulario(campos, data)) {
      return
    }

    
    axios.post('http://localhost:8080/users', data)
    .then(function (response) {
      // manipula o sucesso da requisição
      console.log(response);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuário Cadastrado com Sucesso!',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        window.location = "/users/"
      })
    })
    .catch(function (error) {
      // manipula erros da requisição
      console.error(error);
    })
    .then(function () {
      // sempre será executado
    });
}


const initFn = (e) => { 

      // CRIA UM SELECT COM AS OPTIONS DE CARGO CADASTRADAS
    let select = document.querySelector("select.cargo");

    axios.get("http://localhost:8080/cargos")
    .then((response) => {
        cargos = response.data
        cargos.forEach((cargo) => {
            var option = document.createElement("option");
            select.id = "cargo_id"
            option.value = `${cargo.id}`
            select.value = option.value
            option.innerHTML = `${cargo.nome}`;
            select.appendChild(option);
        })
    })
}