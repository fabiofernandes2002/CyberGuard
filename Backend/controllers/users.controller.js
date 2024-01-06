const utilities = require('../utilities/utilities');
const users = require('../models/users.model');
/* const courses = require('../models/courses.model'); */
//const chats = require('../models/chats.model');
const companies = require('../models/company.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
let secret = "%)$2sF55Idf(Rm&jyPnkqAL^+8m4dSw)"; 

// Registar um novo utilizador (username, email, password, confirmPassword, userType, isOwner, companyName, company)
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
};

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

        const token = jwt.sign(
          {
            id: user._id,
            userType: user.userType,
            username: user.username,
            isOwner: user.isOwner,
          },
          secret,
          {
            expiresIn: 86400, // expires in 24 hours
          }
        );

        res.status(200).send({
          id: user._id,
          userInfo: {
            username: user.username,
            email: user.email,
            userType: user.userType,
            companyName: user.companyName,
            isOwner: user.isOwner,
            company: user.company,
          },
          accessToken: token,
          message: "Login feito com sucesso!"
        });
  
        /* utilities.generateToken({ id: user._id, email: user.email}, (token) => {
          res.status(200).send({
            id: user._id,
            accessToken: token,
            message: "Login feito com sucesso!"
          });
        }); */
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

// listar todos os utilizadores apenas para o admin
exports.getAllUsers = async (req, res) => {
  try {
    console.log(req.loggedUserType);
    if (req.loggedUserType !== 'admin')
      return res.status(403).json({
        success: false,
        msg: 'Apenas o administrador pode aceder a esta funcionalidade!',
      });
    let usersList = await users.find();
    if (!usersList)
      return res.status(404).json({
        success: false,
        msg: 'Utilizadores não encontrados',
      });

    res.status(200).json({
      success: true,
      users: usersList,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

// listar um utilizador específico por id (requer autenticação web token) só proprio utilizador ou admin
exports.getUserById = async (req, res) => {
  try {
    if (req.loggedUserId !== req.params.id && req.loggedUserType !== 'admin')
      return res.status(403).json({
        success: false,
        msg: 'Não tenho premissão para ver este utilizador.',
      });
    let user = await users.findById(req.params.id);
    if (!user)
      return res.status(404).json({
        success: false,
        msg: 'Utilizador não encontrado',
      });

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

// Editar um utilizador específico por id (requer autenticação web token) só proprio utilizador (username, email, password)
exports.editUserById = async (req, res) => {
  try {
    if (req.loggedUserId !== req.params.id)
      return res.status(403).json({
        success: false,
        msg: 'Não tenho premissão para editar este utilizador.',
      });
    
    const { username, email, password, confirmPassword } = req.body;

    // Verificar se o username já existe
    if (username) {
      const userExists = await users.findOne({ username });
      if (userExists) {
        return res.status(400).json({ message: "O username já existe." });
      }
    }

    // Verificar se o email já existe
    if(email) {
      const emailExists = await users.findOne({ email });
      if (emailExists) {
          return res.status(400).json({ message: "O email já existe." });
      }
    }

    // Confirmar password e confirmPassword e não permitir que o utilizador altere a password para a mesma
    const user = await users.findById(req.params.id);
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        if (user.password === password) {
          return res.status(400).json({ message: "A nova password deve ser diferente da password atual." });
        }
      } else {
        return res.status(400).json({ message: "As passwords não correspondem." });
      }
    } else {
      return res.status(400).json({ message: "Por favor, confirme a nova password." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await users.findByIdAndUpdate(
      req.params.id, { 
        username, 
        email, 
        password: hashedPassword 
      }, { new: true });

    if (!updatedUser)
      return res.status(404).json({
        success: false,
        msg: 'Utilizador não encontrado',
      });

    res.status(200).json({
      success: true,
      user: updatedUser,
      msg: `Dados do utilizador ${updatedUser.username} atualizado com sucesso!`
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

// Eliminar um utilizador específico por id (requer autenticação web token) só o admin
exports.deleteUserById = async (req, res) => {
  try {
    if (req.loggedUserType !== 'admin')
      return res.status(403).json({
        success: false,
        msg: 'Apenas o administrador pode aceder a esta funcionalidade!',
      });
    let user = await users.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({
        success: false,
        msg: 'Utilizador não encontrado',
      });

    // atualizar a lista de utilizadores da empresa se o utilizador eliminado for um utilizador empresarial
    if (user.userType === 'empresarial') {
      const company = await companies.findById(user.company);
      if (!company)
        return res.status(404).json({
          success: false,
          msg: 'Empresa não encontrada',
        });
      company.users.pull(user._id); 
      await company.save();
    }

    res.status(200).json({
      success: true,
      msg: `Utilizador ${user.username} eliminado com sucesso!`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
}

// listar todos os utilizadores de uma empresa específica por id (requer autenticação web token) só o admin ou userType === 'empresarial' e isOwner === true
exports.getAllUsersByCompanyId = async (req, res) => {
  try {
    if (req.loggedUserType !== 'admin' && req.loggedUserType !== 'empresarial' && !req.loggedUserIsOwner)
      return res.status(403).json({
        success: false,
        msg: 'Apenas o administrador ou o proprietário da empresa podem aceder a esta funcionalidade!',
      });
    let usersListCompany = await users.find({ company: req.params.id });
    if (!usersListCompany)
      return res.status(404).json({
        success: false,
        msg: 'Utilizadores não encontrados',
      });

    res.status(200).json({
      success: true,
      users: usersListCompany,
      msg: `Utilizadores da empresa ${usersListCompany[0].companyName} listados com sucesso!`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

// Falta fazer esta rota
// depois do fazer o login pela primeira vez, o utilizador deve responder a um questionário para avaliar o seu nível de conhecimento
// a cerca da segurança cibernética, para que o sistema possa recomendar cursos adequados ao seu nível de conhecimento