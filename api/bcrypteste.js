const bcrypt = require('bcrypt');
const saltRounds = 12;
const senha = '123456';

// CADASTRO
bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(senha, salt, function(err, hash) {
      console.log("HASH:", hash)
  });
});

// LOGIN
bcrypt.compare("123456", "$2b$12$pMcnIh304547rk5zbtQpaO8yNvTWw4MOWMxbFN7i/ZdbV7qjpgl2u", function(err, result) {
  console.log(result)
});