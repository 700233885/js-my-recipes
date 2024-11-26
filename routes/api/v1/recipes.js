const router = require('express').Router()
const recipes = require('../../../data/recipes.json')


router.get('/', async (request, response) => {
    const collection = recipes.map(({ id, title, image, prepTime, difficulty }) => {
        return { id, title, image, prepTime, difficulty };
      });

    response.send(collection)
})

router.post('/recipe/add', async (request, response) => {
    const {id, title, image, ingredients, instructions, prepTime, difficulty} = request.body
    const found = recipes.find(data => data.id === id)
    if(found) return response.send({error: 'already exists', found})

    recipes.push(request.body)
    response.send({message: 'added'})
})

router.get('/recipe/:id', async (request, response) => {

    const { id } = request.params
    const found = recipes.find(data => data.id.toString() === id)
    if(!found) response.send({error: `cannot find recipe ${id}`})
    else response.send(found)
})

module.exports = router