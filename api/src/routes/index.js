const { Router } = require('express');
// Importar todos los routers
let dogsRouter = require("./dogs.js")
let tempsRouter = require("./temps.js")

const router = Router();

// Configurar los routers
router.use("/dogs", dogsRouter)
router.use("/temperaments", tempsRouter)


module.exports = router;