let med = null;

function validarFormulario(campos, data) {
    let valido = true;
  
    if (data.nome == "") { //NOME
      campos.nome.parentElement.classList.add("required");
      valido = false;
    } else {
      campos.nome.parentElement.classList.remove("required");
    }
    
    if (data.crm == "") { // CRM
      campos.crm.parentElement.classList.add("required");
      valido = false;
    } else {
      campos.crm.parentElement.classList.remove("required");
    }

    if (data.especializacao == "") { // ESPECIALIZACAO
      campos.especializacao.parentElement.classList.add("required");
      valido = false;  
    } else {
      campos.especializacao.parentElement.classList.remove("required");
    }

    if (data.telefone == "") { //TELEFONE
      campos.telefone.parentElement.classList.add("required");
      valido = false;
    } else {
      campos.telefone.parentElement.classList.remove("required");
    }

    if (data.email == "") { //EMAIL
      campos.email.parentElement.classList.add("required");
      valido = false;
    } else {
      campos.email.parentElement.classList.remove("required");
    }

    return valido;
  }


  function atualizarUsuario(event) {
    event.preventDefault();
  
    const campos = {
      nome: document.getElementById("nome"),
      crm: document.getElementById("crm"),
      especializacao: document.getElementById("especializacao"),
      telefone: document.getElementById("telefone"),
      email: document.getElementById("email"),

    };

    const data = { 
      nome: campos.nome.value.trim(),
      crm: campos.crm.value.trim(),
      especializacao: campos.especializacao.value.trim(),
      telefone: campos.telefone.value.trim(),
      email: campos.email.value.trim(),
    };
    

    if (!validarFormulario(campos, data)) {
      return;
    }
    Swal.fire({
      title: "Atualizar Medico?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Atualizar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:8080/medicos/${params.id}`, data)
          .then(async function (response) {
            await Swal.fire({
              position: "center",
              icon: "success",
              title: "Dados atualizados",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log("Success:", data);
            window.location.href = "/medicos/";
          })
          .catch(function (error) {
            console.log("Error:", error);
            window.location.href = "/medicos/";
          });
      }
    });
  }
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

    const initFn = (e) => {
    
    axios
    .get(`http://localhost:8080/medicos/${params.id}`)
    .then(function (response) {
      med = response.data;

      if (!med) {
        throw new Error("Empty data");
      }
      document.querySelector("input#nome").value = med.nome;
      document.querySelector("input#crm").value = med.crm;
      document.querySelector("input#especializacao").value = med.especializacao;
      document.querySelector("input#telefone").value = med.telefone;
      document.querySelector("input#email").value = med.email;
    })
    .catch(function (error) {
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível encontrar o Médico fornecido.",
        icon: "error",
        confirmButtonText: "Fechar",
      }).then(function (result) {
        window.location.href = "/medicos/";
      });
    });
  };

