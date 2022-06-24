const initFn = (e) => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    axios.get(`http://localhost:8080/medicos/${params.id}`)
    .then(function (response) {

      let med = response.data;
      console.log(med)
      if (!med) {
        throw new Error("Empty data")
      }
      document.querySelector('h4#nome').innerHTML = "Nome: " + med.nome
      document.querySelector('p#crm').innerHTML = "crm: " + med.crm 
      document.querySelector('p#especializacao').innerHTML = "especializacao: " + med.especializacao
      document.querySelector('p#telefone').innerHTML = "telefone: " + med.telefone
      document.querySelector('p#email').innerHTML = "email: " + med.email
    
    })
    .catch(function (error) {
      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível encontrar o Médico fornecido.',
        icon: 'error',
        confirmButtonText: 'Fechar'
      }).then(function (result) {
        window.location.href = '/medicos/';
      })
    })
  
  }
  