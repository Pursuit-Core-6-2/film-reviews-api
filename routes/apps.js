let express = require('express');
let router = express.Router();
let { Apps, Users, Helpers } = require('../db');

router.post("/register", async (req, res, next) => {
  const expectedFields = ["owner_name", "owner_email", "app_name"]
  const app = {
    ...req.body,
    app_id: Helpers.genId()
  }
  const missingFields = Helpers.missingFields(expectedFields, app)

  if (missingFields.length) {
    const err = `Expected valid values for app [${missingFields}]`
    return next(err);
  }

  try {
    let registeredApp = await Apps.createApp(app);
    res.status(201).json({
      payload: {
        app: registeredApp,
        msg: "App registered",
      },
      err: false
    })
  } catch (err) {
    if (typeof err === "string") {
      res.status(409).json({
        payload: {
          msg: err
        },
        err: true
      })
    } else {
      next(err);
    }
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.getAll();
    res.json({
      payload: users,
      err: false
    })
  } catch (err) {
    next(err)
  }
});

router.get('/:owner_email', async (req, res, next) => {
  let { owner_email } = req.params
  try {
    const app = await Apps.getByOwnerEmail(owner_email);
    res.json({
      payload: app,
      err: false
    })
  } catch (err) {
    next(err)
  }
});

router.all('/', (req, res, next) => {
  res.status(405).json({
    payload: "Nah, nah, nah",
    err: true
  })
})

module.exports = router;
