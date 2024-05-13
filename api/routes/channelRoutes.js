const router = require('express').Router();
const Channel = require('../models/Channel');

// get channel
router.get('/', async(req, res)=> {
  await Channel.find()
  .then((data) => {
      res.status(200).send(data);
  })
  .catch(error => {
      res.send(error);
  });
})


//create channel
router.post('/create', async(req, res)=> {
  console.log("req",req)
  if (req.body) {

    const channel = new Channel(req.body);

    await channel.save()
        .then(data => res.status(200).send({ data: data }))
        .catch(err => {
            res.status(500).send(err)
        });
}
})

//update channel
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { answer, doctorName, doctorId } = req.body;
        const channel = await Channel.findByIdAndUpdate(id, { answer, doctorName, doctorId });
        const channels = await Channel.find();
        res.status(200).json(channels);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

//getProductById

router.get('/:id', async (req, res) => {
    await Channel.find({ userId: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    })
})



module.exports = router;
