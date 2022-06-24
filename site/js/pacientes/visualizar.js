const initFn = (e) => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  axios
    .get(`http://localhost:8080/pacientes/${params.id}`)
    .then(function (response) {
      let paciente = response.data;
      console.log(paciente);
      if (!paciente) {
        throw new Error("Empty data");
      }
      document.querySelector("h4#nome").innerHTML = "Nome: " + paciente.nome;
      document.querySelector("p#cpf").innerHTML = "CPF: " + paciente.cpf;
      document.querySelector("p#telefone").innerHTML = "telefone: " + paciente.telefone;
      document.querySelector("p#email").innerHTML = "email: " + paciente.email;
      document.querySelector("p#sexo").innerHTML = "sexo: " + paciente.sexo;
      document.querySelector("p#idade").innerHTML = "idade: " + paciente.idade;
    })
    .catch(function (error) {
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível encontrar o Paciente.",
        icon: "error",
        confirmButtonText: "Fechar",
      }).then(function (result) {
        window.location.href = "/pacientes/";
      });
    });
};
