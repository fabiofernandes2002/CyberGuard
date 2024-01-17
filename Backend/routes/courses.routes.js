const express = require('express');
const router = express.Router();
const Controller = require('../controllers/courses.controller.js');
const utilities = require('../utilities/utilities.js');
const { validationResult, body } = require('express-validator');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// createDiscoverCourse
/**
 * @swagger
 * /courses/createDiscoverCourse:
 *   post:
 *     summary: Cria um novo curso descobrível
 *     tags: [Discovers Courses]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: Imagem do curso
 *     responses:
 *       200:
 *         description: Curso descobrível criado com sucesso
 *       401:
 *         description: Token de autenticação inválido
 *       500:
 *         description: Erro interno do servidor
 */
router
  .route('/createDiscoverCourse')
  .post(utilities.validateToken, upload.single('image'), Controller.createDiscoverCourse);

// getAllDiscoverCourses
/**
 * @swagger
 * /courses/getAllDiscoverCourses:
 *   get:
 *     summary: Obtém todos os cursos descobríveis
 *     tags: [Discovers Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cursos descobríveis obtida com sucesso
 *       401:
 *         description: Token de autenticação inválido
 *       500:
 *         description: Erro interno do servidor
 */
router
  .route('/getAllDiscoverCourses')
  .get(utilities.validateToken, Controller.getAllDiscoverCourses);

// getDiscoverCourseById
/**
 * @swagger
 * /courses/getDiscoverCourseById/{id}:
 *   get:
 *     summary: Obtém um Discover pelo ID
 *     tags: [Discovers Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do Discover a ser obtido
 *     responses:
 *       200:
 *         description: Discover obtido com sucesso
 *       401:
 *         description: Token de autenticação inválido
 *       500:
 *         description: Erro interno do servidor
 */
router
  .route('/getDiscoverCourseById/:id')
  .get(utilities.validateToken, Controller.getDiscoverCourseById);

// deleteDiscoverCourseById
/**
 * @swagger
 * /courses/deleteDiscoverCourseById/{id}:
 *   delete:
 *     tags: [Discovers Courses]
 *     description: Deletes a single course
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Course's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 *     security:
 *       - Bearer: []
 */
router
  .route('/deleteDiscoverCourseById/:id')
  .delete(utilities.validateToken, Controller.deleteDiscoverCourseById);

// createCourse
/**
 * @swagger
 * /courses/createCourse:
 *   post:
 *     tags:
 *       - Courses
 *     description: Creates a new course
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: image
 *         description: Course's image
 *         in: formData
 *         required: true
 *         type: file
 *       - in: body
 *         name: body
 *         description: Course details
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Course'
 *     responses:
 *       200:
 *         description: Successfully created
 *     security:
 *       - Bearer: []
 */
router
  .route('/createCourse')
  .post(utilities.validateToken, upload.single('image'), Controller.createCourse);

// getAllCourses
/**
 * @swagger
 * /courses/getAllCourses:
 *   get:
 *     tags:
 *       - Courses
 *     description: Returns all courses
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of courses
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Course'
 *     security:
 *       - Bearer: []
 */
router.route('/getAllCourses').get(utilities.validateToken, Controller.getAllCourses);

// getCourseById
/**
 * @swagger
 * /courses/getCourseById/{id}:
 *   get:
 *     tags:
 *       - Courses
 *     description: Returns a single course
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Course's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single course
 *         schema:
 *           $ref: '#/definitions/Course'
 *     security:
 *       - Bearer: []
 */
router.route('/getCourseById/:id').get(utilities.validateToken, Controller.getCourseById);

// deleteCourseById
/**
 * @swagger
 * /courses/deleteCourseById/{id}:
 *   delete:
 *     tags:
 *       - Courses
 *     description: Deletes a single course
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Course's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 *     security:
 *       - Bearer: []
 */
router.route('/deleteCourseById/:id').delete(utilities.validateToken, Controller.deleteCourseById);

// startFreeCourseById
/**
 * @swagger
 * /courses/startFreeCourseById/{id}:
 *   put:
 *     tags:
 *       - Courses
 *     description: Starts a free course
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Course's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully started
 *     security:
 *       - Bearer: []
 */
router
  .route('/startFreeCourseById/:id')
  .put(utilities.validateToken, Controller.startFreeCourseById);

// startPaidCourseById
/**
 * @swagger
 * /courses/startPaidCourseById/{id}:
 *   put:
 *     tags:
 *       - Courses
 *     description: Starts a paid course
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Course's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully started
 *     security:
 *       - Bearer: []
 */
router
  .route('/startPaidCourseById/:id')
  .put(utilities.validateToken, Controller.startPaidCourseById);

//course/questions/:id
/**
 * @swagger
 * /courses/getCourseQuestions/{id}:
 *   get:
 *     tags:
 *       - Courses
 *     description: Returns all questions for a specific course
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Course's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of questions
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Question'
 *     security:
 *       - Bearer: []
 */
router.route('/getCourseQuestions/:id').get(utilities.validateToken, Controller.getCourseQuestions);

// Rota para finalizar um curso, incluindo a avaliação do mesmo - finishCourseById
/**
 * @swagger
 * /courses/finishCourseById/{id}:
 *   post:
 *     tags:
 *       - Courses
 *     description: Finishes a course
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Course's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully finished
 *     security:
 *       - Bearer: []
 */
router.route('/finishCourseById/:id').post(utilities.validateToken, Controller.finishCourseById);

// Rota para avaliar um curso - evaluateCourseById
/**
 * @swagger
 * /courses/evaluateCourseById/{id}:
 *   post:
 *     tags:
 *       - Courses
 *     description: Evaluates a course
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Course's id
 *         in: path
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Evaluation details
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Evaluation'
 *     responses:
 *       200:
 *         description: Successfully evaluated
 *     security:
 *       - Bearer: []
 */
router
  .route('/evaluateCourseById/:id')
  .post(utilities.validateToken, Controller.evaluateCourseById);

router.all('*', function (req, res) {
  res.status(404).json({ message: 'COURSES: what???' });
});

module.exports = router;
