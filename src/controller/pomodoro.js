function save (req, res, next) {
  let {pomodoros} = req.body

  if (!pomodoros)
    return next({message: 'Bad Request', status: 400})

  if (!Array.isArray(pomodoros))
    return next({
      message: 'Expect pomodoros to be array', 
      status: 400
    })

  res.sendStatus(200)
}

function get (req, res) {
}

function range (req, res) {

}

module.exports = {
  save, get, range
}
