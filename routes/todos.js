const router = require("express").Router()
const db = require("../models")
const helpers = require('../helpers/apiHelpers')


router.get("/", helpers.findTodos)
router.post("/", helpers.createTodos)
router.put("/:todoId", helpers.updateTodos)
router.delete("/:todoId", helpers.deleteTodos)

module.exports = router