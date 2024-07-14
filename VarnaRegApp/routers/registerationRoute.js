const express = require('express');
const router = express.Router();
const registrationService = require("../services/registrationService");


router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result =  await registrationService.getRegistrationStatus(id);
        res.json(result);
      } 
      catch (err) {
        console.error(err.message)
        res.json(err);
      }
  })
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const result = await registrationService.register(data);
        res.json(result);
        }
     catch (err) {
        console.error(err.message);
        res.json(err);
    }
});
router.post("/:id", async (req, res) => {
  try {
      const uid = req.params.id;
      const { attendance } = req.body;
      
      const result= await registrationService.postDataForId(uid, attendance);
      res.json(result);
      } 
   catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal server error.' });
  }
});
module.exports = router;