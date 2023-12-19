const utilities = require('../utilities/utilities');
const users = require('../models/users.model');
const courses = require('../models/courses.model');
const chats = require('../models/chats.model');
const companies = require('../models/company.model');
const bcrypt = require("bcrypt");

// Register a new user

exports.register = async function (req, res) {
  try {

    const { username, email, password, confirmPassword, userType, isOwner, companyName, company } = req.body;
    // Se o userType for 'empresarial' e isOwner for true, o usuário deve fornecer um companyName
    if (userType === 'empresarial' && isOwner && !companyName) {
      return res.status(400).send('Por favor, forneça um nome de empresa.');
    }

    // Se o userType for 'empresarial' e isOwner for true, crie uma nova empresa
    let companyExists;
    if (userType === 'empresarial' && isOwner) {
      const newCompany = new companies({ name: companyName, owner: null, users: [] });
      await newCompany.save();
      companyExists = newCompany;
    }

    // Se o userType for 'empresarial' e isOwner for false, o usuário deve escolher uma empresa existente
    if (userType === 'empresarial' && !isOwner) {
      if (!company) {
        return res.status(400).send('Por favor, escolha uma empresa.');
      }
    
      // Verifique se a empresa escolhida existe
      companyExists = await companies.findById(company );
      if (!companyExists) {
        return res.status(400).send('A empresa não existe.');
      }
    }
    // Se não houver empresas disponíveis, retorne uma mensagem de erro
    const companiesVerify = await companies.find();
    if (companiesVerify.length === 0) {
      return res.status(400).send('Não há empresas disponíveis.');
    }

    // se o userType for 'normal ou professional', o usuário não deve fornecer um companyName ou company
    if (userType !== 'empresarial' && (companyName || company)) {
      return res.status(400).send('O userType não pode ser normal ou professional.');
    }

    // Verificar se o username já existe
    const userExists = await users.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "O username já existe." });
    }

    // Verificar se o email já existe
    const emailExists = await users.findOne({ email });
    if (emailExists) {
        return res.status(400).json({ message: "O email já existe." });
    }

    // Confirmar password e confirmPassword
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "As passwords não coincidem." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new users({ username, email, password: hashedPassword, userType, companyName, isOwner, company: companyExists ? companyExists._id : null});
    

    // Se o userType for 'empresarial' e isOwner for true, atualize a empresa com o ID do novo usuário
    if (userType === 'empresarial' && isOwner) {
      companyExists.owner = user._id;
      await companyExists.save();
    }

    // Se o userType for 'empresarial' e isOwner for false, adicione o novo usuário à lista de usuários da empresa
    if (userType === 'empresarial' && !isOwner) {
      companyExists.users.push(user._id);
      await companyExists.save();
    }

    await user.save();
    res.status(201).json({ 
      message: "Registo do utilizador efetuado com sucesso!",
      user: user
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// login com email e password e emissao de token
exports.login = (req, res) => {
    users.findOne({
      email: req.body.email
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "Utilizador não encontrado!" });
        }
  
        let passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Password inválida!"
          });
        }
  
        utilities.generateToken({ id: user._id, email: user.email }, (token) => {
          res.status(200).send({
            id: user._id,
            accessToken: token,
            message: "Login feito com sucesso!"
          });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};