const initFn = (e) => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    axios.get(`http://localhost:8080/agendamentos/${params.id}`)
    .then(function (response) {

      let schedule = response.data;
      console.log(schedule)
      if (!schedule) {
        throw new Error("Empty data")
      }
      document.querySelector('h4#medico').innerHTML = "medico: " + schedule.nome
      document.querySelector('p#paciente').innerHTML = "paciente: " + schedule.paciente_nome
      document.querySelector('p#datetime').innerHTML = "Data da Consulta: " + schedule.datetime
      document.querySelector('p#observacao').innerHTML = "observacao: " + schedule.observacao
      
    
    })
    .catch(function (error) {
      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível encontrar o seu Agendamento.',
        icon: 'error',
        confirmButtonText: 'Fechar'
      }).then(function (result) {
        window.location.href = '/agendamentos/';
      })
    })
  
  }
  