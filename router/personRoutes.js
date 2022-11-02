const router = require('express').Router()
const Person = require('../models/Person');

// GET
router.get('/', async (req, res) => {
  try {
    const people = await Person.find()
    res.status(200).json(people)
  } catch(err) {
    res.status(500).json({error: 'error'})
  }
})

// GET ID
router.get('/:id', async (req, res) => {
  const {id} = req.params
  try {
    const person = await Person.findOne({_id: id})
    if(!person){
      res.status(422).json({message: 'usuario não encontrado'})
      return
    }
    res.status(200).json(person)
  } catch(err) {
    res.status(500).json({error: 'error'})
  }
})

// POST
router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;
  if (!name) {
    res.status(422).json({ error: "O nome e obrigatorio!" });
  }
  try {
    await Person.create({
      name,
      salary,
      approved,
    });
    res.status(201).json({ message: 'Usuario adicionado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


// UPDATE
router.patch('/:id', async (req, res) => {
    const {id} = req.params
    const { name, salary, approved } = req.body
    try {
      const updatePerson = await Person.updateOne({_id: id}, {
        name,
        salary,
        approved
      })
      if(updatePerson.matchedCount === 0) {
        res.status(422).json({message: 'O usuario não foi encontrado!'})
        return
      }
      res.status(200).json({
        name, salary, approved
      })
    } catch(err) {
      res.status(500).json({ error: err })
    }
})

// DELETE
router.delete('/:id', async (req, res) => {
  const {id} = req.params
  const person = await Person.findOne({_id: id})
  if(!person) {
    res.status(422).json({ message: 'O usuario não foi econtrado!' })
    return
  }
  try {
    await Person.deleteOne({_id: id})
    res.status(200).json({ message: 'Usuario removido com sucesso!' })
  } catch(err) {
    res.status(500).json({ error: err })
  }
})

module.exports = router;