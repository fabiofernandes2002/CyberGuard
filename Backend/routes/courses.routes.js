const express = require('express');
const router = express.Router();
const Controller = require('../controllers/courses.controller.js');
const utilities = require('../utilities/utilities.js');
const { validationResult, body } = require('express-validator');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// createDiscoverCourse
<<<<<<< HEAD
router.route('/createDiscoverCourse')
    .post(utilities.validateToken, upload.single('image'), Controller.createDiscoverCourse);
=======
router
  .route('/createDiscoverCourse')
  .post(utilities.validateToken, Controller.createDiscoverCourse);
>>>>>>> bcbbb38a0b6d9fba08f350540f278c3bc9b600d9

// getAllDiscoverCourses
router
  .route('/getAllDiscoverCourses')
  .get(utilities.validateToken, Controller.getAllDiscoverCourses);

// getDiscoverCourseById
router
  .route('/getDiscoverCourseById/:id')
  .get(utilities.validateToken, Controller.getDiscoverCourseById);

// deleteDiscoverCourseById
router
  .route('/deleteDiscoverCourseById/:id')
  .delete(utilities.validateToken, Controller.deleteDiscoverCourseById);

// createCourse
<<<<<<< HEAD
/* router.route('/createCourse')
    .post(
        utilities.validateToken, 
        multerMultiple.fields([
            { name: 'image', maxCount: 1 },
            { name: 'video', maxCount: 5 }
        ]), 
        Controller.createCourse
    ); */
router.route('/createCourse')
.post(
    utilities.validateToken, 
    upload.single('image'),
    Controller.createCourse
);
=======
router.route('/createCourse').post(utilities.validateToken, Controller.createCourse);
>>>>>>> bcbbb38a0b6d9fba08f350540f278c3bc9b600d9

// getAllCourses
router.route('/getAllCourses').get(utilities.validateToken, Controller.getAllCourses);

// getCourseById
router.route('/getCourseById/:id').get(utilities.validateToken, Controller.getCourseById);

// deleteCourseById
router.route('/deleteCourseById/:id').delete(utilities.validateToken, Controller.deleteCourseById);

// startFreeCourseById
router
  .route('/startFreeCourseById/:id')
  .put(utilities.validateToken, Controller.startFreeCourseById);

// startPaidCourseById
router
  .route('/startPaidCourseById/:id')
  .put(utilities.validateToken, Controller.startPaidCourseById);

//course/questions/:id
router.route('/getCourseQuestions/:id').get(utilities.validateToken, Controller.getCourseQuestions);

// Rota para finalizar um curso, incluindo a avaliação do mesmo - finishCourseById
router.route('/finishCourseById/:id').post(utilities.validateToken, Controller.finishCourseById);

// Rota para avaliar um curso - evaluateCourseById
router
  .route('/evaluateCourseById/:id')
  .post(utilities.validateToken, Controller.evaluateCourseById);

router.all('*', function (req, res) {
  res.status(404).json({ message: 'COURSES: what???' });
});

module.exports = router;
