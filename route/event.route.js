const express = require("express");
const event = require("../controller/event.controller");
const router = express.Router();

const upload = require("../middleware/upload")

router.get('/events',event.get_events);
router.post('/events',upload.single(),event.add_events);
router.put('/events/:id',event.update_event);
router.delete('/events/:id',event.delete_event);



module.exports = router;