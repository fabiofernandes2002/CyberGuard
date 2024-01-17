require('dotenv').config();
const fs = require('fs');
const courses = require('../models/courses.model');
const discoverCourses = require('../models/discoverCourses.model');
const users = require('../models/users.model');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// criar discoverCourse onde vai ter todos os cursos associados a aquele discover - admin funcionalidade (requer autenticação web token)
exports.createDiscoverCourse = async function (req, res) {
  try {
    if (req.loggedUserType !== 'admin') {
      return res.status(403).json({
        success: false,
        msg: 'Apenas o administrador pode aceder a esta funcionalidade!',
      });
    }

    const { description } = req.body;

    if (!description || !req.file) {
      return res.status(400).json({
        success: false,
        msg: 'Preencha todos os campos e inclua uma imagem!',
      });
    }

    // Fazer upload da imagem para o Cloudinary na pasta "Discovers"
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'Discovers',
    });

    // Usar a URL da imagem do Cloudinary
    const imgURL = result.url;

    // Excluir o arquivo temporário
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Erro ao excluir o arquivo temporário', err);
      } else {
        console.log('Arquivo temporário excluído com sucesso');
      }
    });

    // Verificar se o discoverCourse já existe
    let discoverCourse = await discoverCourses.findOne({ description });
    if (discoverCourse) {
      return res.status(400).json({
        success: false,
        msg: 'DiscoverCourse já existe!',
      });
    }

    // Criar novo discoverCourse
    discoverCourse = new discoverCourses({ imgURL, description });
    await discoverCourse.save();
    res.status(201).json({
      success: true,
      msg: 'DiscoverCourse criado com sucesso!',
      discoverCourse: discoverCourse,
    });

    // criar novo discoverCourse
    discoverCourse = new discoverCourses({ imgURL, description });
    await discoverCourse.save();
    res.status(201).json({
      success: true,
      msg: 'DiscoverCourse criado com sucesso!',
      discoverCourse: discoverCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: error.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

// getAllDiscoverCourses - listar todos os discoverCourses com autenticação do web token
exports.getAllDiscoverCourses = async (req, res) => {
  try {
    // tem que estar autenticado para aceder a esta funcionalidade
    if (!req.loggedUserId)
      return res.status(403).json({
        success: false,
        msg: 'Você deve estar autenticado para realizar esta solicitação!',
      });

    let discoverCoursesList = await discoverCourses.find();
    if (!discoverCoursesList)
      return res.status(404).json({
        success: false,
        msg: 'DiscoverCourses não encontrados',
      });

    res.status(200).json({
      success: true,
      discoverCourses: discoverCoursesList,
      msg: 'DiscoverCourses listados com sucesso!',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

// getDiscoverCourseById - listar um discoverCourse específico por id (requer autenticação web token)
exports.getDiscoverCourseById = async (req, res) => {
  try {
    // tem que estar autenticado para aceder a esta funcionalidade
    if (!req.loggedUserId)
      return res.status(403).json({
        success: false,
        msg: 'Você deve estar autenticado para realizar esta solicitação!',
      });

    let discoverCourse = await discoverCourses.findById(req.params.id);
    if (!discoverCourse)
      return res.status(404).json({
        success: false,
        msg: 'DiscoverCourse não encontrado',
      });

    res.status(200).json({
      success: true,
      discoverCourse: discoverCourse,
      msg: 'DiscoverCourse listado com sucesso!',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

// deleteDiscoverCourseById - Remover um discoverCourse específico por id (requer autenticação web token) - admin funcionalidade
exports.deleteDiscoverCourseById = async (req, res) => {
  try {
    // tem que estar autenticado para aceder a esta funcionalidade
    if (req.loggedUserType !== 'admin')
      return res.status(403).json({
        success: false,
        msg: 'Apenas o administrador pode aceder a esta funcionalidade!',
      });

    let discoverCourse = await discoverCourses.findByIdAndDelete(req.params.id);
    if (!discoverCourse)
      return res.status(404).json({
        success: false,
        msg: 'DiscoverCourse não encontrado',
      });

    res.status(200).json({
      success: true,
      msg: 'DiscoverCourse removido com sucesso!',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

// criar novo curso - admin funcionalidade
exports.createCourse = async function (req, res) {
  try {
    let imgURL = '';
    let evaluations = [];
    let videos = [];

    if (req.loggedUserType !== 'admin')
      return res.status(403).json({
        success: false,
        msg: 'Apenas o administrador pode aceder a esta funcionalidade!',
      });

    const { idDiscover, name, nameCourse, paid, price, description } = req.body;

    // fazer validações dos campos recebidos um a um
    if (!idDiscover)
      return res.status(400).json({
        success: false,
        msg: 'Preencha o campo idDiscover!',
      });
    if (!name)
      return res.status(400).json({
        success: false,
        msg: 'Preencha o campo name!',
      });
    if (paid === undefined || paid === null)
      return res.status(400).json({
        success: false,
        msg: 'Preencha o campo paid!',
      });
    if (paid === true && (price === undefined || price === null || price === 0)) {
      return res.status(400).json({
        success: false,
        msg: 'Preencha o campo price!',
      });
    }
    if (typeof req.body.price === 'string') {
      req.body.price = req.body.price.replace(/[^0-9.,]/g, '').replace(',', '.');
    }
    if (!videos)
      return res.status(400).json({
        success: false,
        msg: 'Preencha o campo videos!',
      });
    if (!description)
      return res.status(400).json({
        success: false,
        msg: 'Preencha o campo description!',
      });
    if (!evaluations)
      return res.status(400).json({
        success: false,
        msg: 'Preencha o campo evaluations!',
      });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'course_image',
    });

    imgURL = result.url;

    if (!imgURL)
      return res.status(400).json({
        success: false,
        msg: 'Preencha o campo imgURL!',
      });

    // Processar informações das avaliações
    const maxQuestions = 25;
    for (let i = 1; i <= maxQuestions; i++) {
      if (req.body[`question${i}`]) {
        const question = req.body[`question${i}`];
        const answers = req.body[`answers${i}`] ? req.body[`answers${i}`].split(',') : [];

        let correctAnswerIndex = parseInt(req.body[`correctAnswerIndex${i}`]);

        if (isNaN(correctAnswerIndex)) {
          correctAnswerIndex = 0;
        }

        evaluations.push({
          questions: [{ question, answers, correctAnswerIndex }],
        });
      }
    }

    // Processar informações de vídeos do YouTube
    const maxVideos = 5; // por exemplo
    for (let i = 1; i <= maxVideos; i++) {
      if (req.body[`videoURL${i}`]) {
        videos.push({
          videoURL: req.body[`videoURL${i}`],
          title: req.body[`title${i}`],
          duration: req.body[`duration${i}`],
        });
      }
    }

    // verificar se o curso já existe
    let course = await courses.findOne({ nameCourse });
    if (course)
      return res.status(400).json({
        success: false,
        msg: 'Curso já existe!',
      });

    // criar novo curso
    course = new courses({
      idDiscover,
      name,
      nameCourse,
      paid,
      price,
      videos,
      description,
      evaluations,
      imgURL,
    });

    if (course.price === 0 || course.paid === false) {
      course.price = 'FREE';
      course.paid = true; //
    }

    await course.save();

    // associar o course ao courseIds do discoverCourse correspondente no discoverCourses model
    await discoverCourses.findByIdAndUpdate(
      idDiscover,
      { $push: { coursesIds: course._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      msg: 'Curso criado com sucesso!',
      course: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

// listar todos os cursos com autenticação do web token
exports.getAllCourses = async (req, res) => {
  try {
    // tem que estar autenticado para aceder a esta funcionalidade
    if (!req.loggedUserId)
      return res.status(403).json({
        success: false,
        msg: 'Você deve estar autenticado para realizar esta solicitação!',
      });

    let coursesList = await courses.find();
    if (!coursesList)
      return res.status(404).json({
        success: false,
        msg: 'Cursos não encontrados',
      });

    res.status(200).json({
      success: true,
      courses: coursesList,
      msg: 'Cursos listados com sucesso!',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

// listar um curso específico por id (requer autenticação web token)
exports.getCourseById = async (req, res) => {
  try {
    // tem que estar autenticado para aceder a esta funcionalidade
    if (!req.loggedUserId)
      return res.status(403).json({
        success: false,
        msg: 'Você deve estar autenticado para realizar esta solicitação!',
      });

    let course = await courses.findById(req.params.id);
    if (!course)
      return res.status(404).json({
        success: false,
        msg: 'Curso não encontrado',
      });

    res.status(200).json({
      success: true,
      course: course,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

// Remover um curso específico por id (requer autenticação web token) - admin funcionalidade
exports.deleteCourseById = async (req, res) => {
  try {
    // tem que estar autenticado para aceder a esta funcionalidade
    if (req.loggedUserType !== 'admin')
      return res.status(403).json({
        success: false,
        msg: 'Apenas o administrador pode aceder a esta funcionalidade!',
      });

    let course = await courses.findByIdAndDelete(req.params.id);
    if (!course)
      return res.status(404).json({
        success: false,
        msg: 'Curso não encontrado',
      });

    // remover o curso do array de coursesIds do discoverCourse correspondente no discoverCourses model
    await discoverCourses.findByIdAndUpdate(
      course.idDiscover,
      { $pull: { coursesIds: course._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: 'Curso removido com sucesso!',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

// Iniciar um curso específico por id (requer autenticação web token) curso free
exports.startFreeCourseById = async (req, res) => {
  try {
    // tem que estar autenticado para aceder a esta funcionalidade
    if (!req.loggedUserId)
      return res.status(403).json({
        success: false,
        msg: 'Você deve estar autenticado para realizar esta solicitação!',
      });

    let course = await courses.findById(req.params.id);
    if (!course)
      return res.status(404).json({
        success: false,
        msg: 'Curso não encontrado',
      });

    // verificar se o curso é pago
    if (course.paid === true)
      return res.status(400).json({
        success: false,
        msg: 'Curso pago!',
      });

    const user = await users.findById(req.loggedUserId);
    // Verificar se o curso já foi iniciado
    const isCourseStarted = user.courses.some(
      (courseItem) => courseItem.courseId.toString() === course._id.toString() && courseItem.started
    );

    if (isCourseStarted) {
      return res.status(400).json({
        success: false,
        msg: 'Curso já iniciado!',
      });
    }

    // Iniciar o curso
    const courseId = course._id.toString();

    // Encontre o índice do curso no array de cursos do utilizador
    const courseIndex = user.courses.findIndex((c) => c.courseId === courseId);

    // Se o curso não existir no array de cursos do utizadores, adicione-o
    if (courseIndex === -1) {
      user.courses.push({
        courseId: course._id,
        started: true,
        startedDate: Date.now(),
        finished: false,
        finishedDate: null,
      });
    } else {
      // Se o curso já estiver no array de cursos do usuário, atualize-o
      user.courses[courseIndex].started = true;
      user.courses[courseIndex].startedDate = Date.now();
    }

    // Salve o utilizador atualizado
    await user.save();

    res.status(200).json({
      success: true,
      msg: 'Curso iniciado com sucesso!',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

// Iniciar um curso específico por id (requer autenticação web token) curso pago, dados de pagamento no body
exports.startPaidCourseById = async (req, res) => {
  try {
    // Verificar se o usuário está autenticado
    if (!req.loggedUserId) {
      return res.status(403).json({
        success: false,
        msg: 'Você deve estar autenticado para realizar esta solicitação!',
      });
    }

    const course = await courses.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        msg: 'Curso não encontrado',
      });
    }

    // Verificar se o curso é pago
    if (!course.paid) {
      return res.status(400).json({
        success: false,
        msg: 'Curso gratuito!',
      });
    }

    const user = await users.findById(req.loggedUserId);

    // Verificar se o curso já foi iniciado
    const isCourseStarted = user.courses.some(
      (courseItem) => courseItem.courseId.toString() === course._id.toString() && courseItem.started
    );

    if (isCourseStarted) {
      return res.status(400).json({
        success: false,
        msg: 'Curso já iniciado!',
      });
    }

    // Verificar e validar os dados de pagamento passados no corpo da solicitação
    const {
      cardType,
      cardNumber,
      cardCVV,
      cardTitular,
      paymentValue,
      paymentDate,
      cardExpirationDate,
    } = req.body.paymentInfo;

    // Aqui você deve ter a lógica para validar os dados do cartão e outros detalhes do pagamento

    // Verificar se o valor do pagamento é igual ao preço do curso
    if (course.price !== paymentValue) {
      return res.status(400).json({
        success: false,
        msg: 'Valor do pagamento não corresponde ao preço do curso!',
      });
    }

    // Atualizar apenas os campos específicos de paymentInfo
    const updatedUser = await users.findByIdAndUpdate(
      req.loggedUserId,
      {
        $push: {
          paymentInfo: {
            paymentData: {
              cardType,
              cardNumber,
              cardCVV,
              cardTitular,
              paymentDate,
              paymentValue,
              cardExpirationDate,
            },
          },
        },
      },
      { new: true }
    );

    // Iniciar o curso
    const courseId = course._id.toString();

    // Encontrar o índice do curso no array de cursos do utilizador
    const courseIndex = user.courses.findIndex((c) => c.courseId === courseId);

    // Se o curso não existir no array de cursos do utilizador, adicione-o
    if (courseIndex === -1) {
      user.courses.push({
        courseId: course._id,
        started: true,
        startedDate: Date.now(),
        finished: false,
        finishedDate: null,
      });
    } else {
      // Se o curso já estiver no array de cursos do usuário, atualize-o
      user.courses[courseIndex].started = true;
      user.courses[courseIndex].startedDate = Date.now();
    }

    // Salvar o utilizador atualizado
    await user.save();

    res.status(200).json({
      success: true,
      user: updatedUser,
      msg: 'Curso iniciado com sucesso!',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

exports.getCourseQuestions = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await courses.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        msg: 'Curso não encontrado',
      });
    }

    // Suponha que há apenas um conjunto de perguntas de avaliação por curso
    const courseQuestions = course.evaluations[0].questions;

    res.status(200).json({
      success: true,
      questions: courseQuestions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};

// Finalizar um curso específico por id (requer autenticação web token) - responder a um questionário de avaliação
exports.finishCourseById = async (req, res) => {
  try {
    console.log("Respostas recebidas:", req.body.userAnswers);
    const userId = req.loggedUserId; // Certifique-se de que o middleware de autenticação define req.loggedUserId corretamente

    // Verifique se o usuário está autenticado
    if (!userId) {
      return res.status(403).json({
        success: false,
        msg: "Você deve estar autenticado para realizar esta solicitação!",
      });
    }

    // Encontre o curso pelo ID
    let course = await courses.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        msg: "Curso não encontrado",
      });
    }

    // Encontre o usuário pelo ID
    const user = await users.findById(userId);

    // Verifique se o curso já foi finalizado pelo usuário
    if (
      user.courses.some(
        (course) => course.courseId.equals(req.params.id) && course.finished
      )
    ) {
      return res.status(400).json({
        success: false,
        msg: "Curso já finalizado!",
      });
    }

    const courseQuestions = course.evaluations.flatMap(
      (evaluation) => evaluation.questions
    );

    const userAnswers = req.body.userAnswers;

    let userScore = 0;

    courseQuestions.forEach((question, index) => {
      const userAnswer = userAnswers.find(
        (answer) => answer.questionIndex === index
      );
      if (userAnswer && userAnswer.answer !== -1) {
        const userAnswerIndex = parseInt(userAnswer.answer) - 1;
        if (userAnswerIndex === question.correctAnswerIndex) {
          userScore += 1;
        }
      }
    });

    // Atualize as propriedades do usuário
    user.totalCoursesCompleted += 1;
    user.pontuationMediaEvaluation =
      (user.pontuationMediaEvaluation * (user.totalCoursesCompleted - 1) +
        userScore) /
      user.totalCoursesCompleted;

    // Encontre o índice do curso no array de cursos do usuário
    let courseIndex = user.courses.findIndex((courseItem) =>
      courseItem.courseId.equals(req.params.id)
    );

    // Verifique se o curso foi encontrado
    if (courseIndex !== -1) {
      // Atualize os campos desejados do curso
      user.courses[courseIndex].finished = true;
      user.courses[courseIndex].finishedDate = Date.now();
      user.courses[courseIndex].evaluationScore = userScore;
    } else {
      // Se o curso não foi encontrado, adicione-o ao array de cursos do usuário
      user.courses.push({
        courseId: req.params.id,
        finished: true,
        finishedDate: Date.now(),
        evaluationScore: userScore,
      });
    }

    // Salve as alterações no usuário
    await user.save();

    res.status(200).json({
      success: true,
      msg: "Curso finalizado com sucesso!",
      evaluationScore: userScore,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: err.message || "Algo correu mal, tente novamente mais tarde.",
    });
  }
};

// Avaliar um curso específico por id (requer autenticação web token) - avaliação de 1 a 5 estrelas
exports.evaluateCourseById = async (req, res) => {
  try {
    // Verificar se o usuário está autenticado
    if (!req.loggedUserId) {
      return res.status(403).json({
        success: false,
        msg: 'Você deve estar autenticado para realizar esta solicitação!',
      });
    }

    // Encontrar o curso pelo ID
    let course = await courses.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        msg: 'Curso não encontrado',
      });
    }

    const user = await users.findById(req.loggedUserId);

    // Verificar se o curso já foi avaliado pelo usuário
    if (user.courses.evaluationResults.some((result) => result.courseId.equals(req.params.id))) {
      return res.status(400).json({
        success: false,
        msg: 'Curso já avaliado!',
      });
    }

    // Obter a avaliação do usuário a partir do corpo da solicitação
    const { stars } = req.body;

    // Adicionar feedback ao curso
    course.feedbacks.push({
      userId: req.loggedUserId,
      stars: stars,
    });

    // Atualizar a classificação média do curso
    const totalFeedbacks = course.feedbacks.length;
    const totalStars = course.feedbacks.reduce((sum, feedback) => sum + feedback.stars, 0);
    course.rating = totalStars / totalFeedbacks;

    // Salvar alterações no curso
    await course.save();

    res.status(200).json({
      success: true,
      msg: 'Curso avaliado com sucesso!',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: err.message || 'Algo correu mal, tente novamente mais tarde.',
    });
  }
};
