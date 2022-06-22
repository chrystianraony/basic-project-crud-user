const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const initFn = (e) => {

    axios.get(`http://localhost:8080/users/${params.id}`)
    .then(function (response) {
    let user = response.data;
    if (!user) {
        throw new Error("Empty data")
    }
    document.querySelector('h4#nome').innerHTML = "Nome: " + user.nome
    document.querySelector('p#cpf').innerHTML = "CPF: " + user.cpf
    document.querySelector('p#rg').innerHTML = "RG: " + user.rg
    document.querySelector('p#email').innerHTML = "E-mail: " + user.email
    document.querySelector('p#cidade').innerHTML = "Cidade: " + user.cidade
    document.querySelector('p#cargo_nome').innerHTML = "Cargo: " + user.cargo_nome
    
    })
    .catch(function (error) {
        Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível encontrar o usuário fornecido.',
            icon: 'error',
            confirmButtonText: 'Fechar'
        }).then(function (result) {
            window.location.href = '/users/';
            })
    })

}