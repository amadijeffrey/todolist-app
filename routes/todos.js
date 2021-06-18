const router = require("express").Router()
const db = require("../models")


router.get("/", (req, res) => {
    db.User.findById(req.user._id).populate('todos').exec()
        .then((user) => {
            res.json(user.todos)
        })
        .catch((err) => {
            res.send(err)
        })
})
router.post("/", (req, res) => {
    db.User.findById(req.user._id, function (err, user) {
        if (err) {
            console.log(err)
        } else {
            db.Todo.create(req.body)
                .then((newTodo) => {
                    newTodo.save()
                    user.todos.push(newTodo)
                    user.save()
                    res.json(newTodo)
                })
                .catch((err) => {
                    res.send(err)
                })
        }
    })

})
router.get("/:todoId", (req, res) => {
    db.Todo.findById(req.params.todoId)
        .then((foundTodo) => {
            res.json(foundTodo)
        })
        .catch((err) => {
            res.send(err)
        })
})
router.put("/:todoId", (req, res) => {
    db.Todo.findByIdAndUpdate(req.params.todoId, req.body, { new: true })
        .then((todo) => {
            res.json(todo)
        })
        .catch((err) => {
            res.send(err)
        })
})
router.delete("/:todoId", (req, res) => {
    db.Todo.findByIdAndRemove(req.params.todoId)
        .then(() => {
            res.json({ message: "We deleted it" })
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = router