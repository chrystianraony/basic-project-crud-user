const initFn = (e) => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
    
  axios.get(`http://localhost:8080/cargos/${params.id}`)
  .then(function (response) {
    let data = response.data;
    if (!data) {
      throw new Error("Empty data")
    }
    document.querySelector('h4#nome').innerHTML = "Nome: " + data.nome
  
  })
  .catch(function (error) {
    Swal.fire({
      title: 'Erro!',
      text: 'Não foi possível encontrar o usuário fornecido.',
      icon: 'error',
      confirmButtonText: 'Fechar'
    }).then(function (result) {
      window.location.href = '/users.html';
    })
  })

}
