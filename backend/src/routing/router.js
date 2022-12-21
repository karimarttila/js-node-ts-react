import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
  // For debugging:
  // console.log('********** REQUEST ***********');
  // console.log(req);
  // console.log('********** RESPONSE ***********');
  // console.log(res);
  next()
})

router.get('/hello', (req, res) => {
  return res.status(200).json({
    message: "Hello Yeah!",
  });
})

export { router };
