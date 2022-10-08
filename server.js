"use strict";
const log = console.log;

// starting the express server
const express = require("express");
const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set("useFindAndModify", false); // for some deprecation issues

// import the mongoose models
const { User } = require("./models/user");
const { Admin } = require("./models/admin");
const { Article } = require("./models/article");
const { Vaccine } = require("./models/vaccine");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling **************************************/
// Create a session cookie
app.use(
  session({
    secret: "oursecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 3600000,
      httpOnly: true,
    },
  })
);

// A route to login (for general user) and create a session
app.post("/users/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  log(username, password);

  // Use the static method on the User model to find a user
  // by their username and password
  User.findByUsernamePassword(username, password)
    .then((user) => {
      // Add the user's id to the session cookie.
      // We can check later if this exists to ensure we are logged in.
      req.session._id = user._id;
      req.session.username = user.username;
      req.session.isAdmin = false;
      res.send({ currentUser: user._id });
    })
    .catch((error) => {
      res.status(400).send();
    });
});

// A route to login (for health professional) and create a session
app.post("/admins/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  log(username, password);

  // Use the static method on the Admin model to find an admin
  // by their username and password
  Admin.findByUsernamePassword(username, password)
    .then((admin) => {
      // Add the admin's id to the session cookie.
      // We can check later if this exists to ensure we are logged in.
      req.session._id = admin._id;
      req.session.username = admin.username;
      req.session.isAdmin = true;
      res.send({ currentUser: admin._id });
    })
    .catch((error) => {
      res.status(400).send();
    });
});

// A route to check if a user/admin is logged in on the session cookie
app.get("/check-session", (req, res) => {
  if (req.session._id) {
    res.send({ currentUser: req.session._id });
  } else {
    res.status(401).send();
  }
});

// A route to logout a user/admin
app.get("/logout", (req, res) => {
  // Remove the session
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send();
    }
  });
});

/*** Image API Routes below ************************************/
// Image storage and cloud
const { Image } = require("./models/image");

// Middleware to upload file from req.file
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

// Cloudinary stuff
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dxwv7jpbc",
  api_key: "126927883853136",
  api_secret: "o_d9H5fRlxyKcvUqjPP1l5XAJBY",
});

// a POST route to *create* an image
app.post("/images", multipartMiddleware, (req, res) => {
  // Use uploader.upload API to upload image to cloudinary server.
  cloudinary.uploader.upload(
    req.files.imageInput.path, // req.files contains uploaded files
    function (result) {
      // Create a new image using the Image mongoose model
      var img = new Image({
        image_id: result.public_id, // image id on cloudinary server
        image_url: result.url, // image url on cloudinary server
        created_at: new Date(),
      });

      // Save image to the database
      img.save().then(
        (saveRes) => {
          res.send(saveRes);
        },
        (error) => {
          res.status(400).send(error); // 400 for bad request
        }
      );
    }
  );
});

// a GET route to get all images
app.get("/images", (req, res) => {
  Image.find().then(
    (images) => {
      res.send({ images }); // can wrap in object if want to add more properties
    },
    (error) => {
      res.status(500).send(error); // server error
    }
  );
});

/// a DELETE route to remove an image by its id.
app.delete("/images/:imageId", (req, res) => {
  const imageId = req.params.imageId;

  // Delete an image by its id (NOT the database ID, but its id on the cloudinary server)
  // on the cloudinary server
  cloudinary.uploader.destroy(imageId, function (result) {
    // Delete the image from the database
    Image.findOneAndRemove({ image_id: imageId })
      .then((img) => {
        if (!img) {
          res.status(404).send();
        } else {
          res.send(img);
        }
      })
      .catch((error) => {
        res.status(500).send(); // server error, could not delete.
      });
  });
});

/*** API Routes below ************************************/

/** User routes below **/
// Set up a POST route to *create* a user
app.post("/users/register", (req, res) => {
  log(req.body);

  // Create a new user
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthdate: new Date(req.body.birthdate),
    gender: req.body.gender,
    phoneNum: req.body.phoneNum,
    healthCardNum: req.body.healthCardNum,
    passportNum: "",
  });

  // Save the user
  user.save().then(
    (user) => {
      req.session._id = user._id;
      req.session.username = user.username;
      req.session.isAdmin = false;
      res.send({ currentUser: user._id });
    },
    (error) => {
      log(error);
      res.status(400).send(error); // 400 for bad request
    }
  );
});

// A GET route for admin to get all users
app.get("/users", (req, res) => {
  // check mongoose connection established
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal Server Error");
    });
});

// A GET route to get a user by their id
app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  // Validate id immediately
  if (!ObjectID.isValid(id)) {
    // If invalid id, definitely can't find resource, 404
    res.status(404).send();
    return;
  }

  // Otherwise, findById
  User.findById(id)
    .then((user) => {
      if (!user) {
        // Could not find this user
        res.status(404).send();
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      // Server error
      res.status(500).send();
    });
});

// A PUT route to update User's information
app.put("/users/:id", (req, res) => {
  const id = req.params.id;

  // Validate id
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  // Check mongoose connection
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  // Find user by id and update the information
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("User not found");
      } else {
        user.set(req.body);
        user
          .save()
          .then((result) => {
            res.send(result);
          })
          .catch((error) => {
            if (isMongoError(error)) {
              res.status(500).send("Internal server error");
            } else {
              log(error);
              res.status(400).send("Bad request");
            }
          });
      }
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal server error");
    });
});

// A PUT route to update User's password
app.put("/users/:id/password", (req, res) => {
  const id = req.params.id;

  // Validate id
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  // Check mongoose connection
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  // Validate the old password first then update to the new password
  const username = req.body.username;
  const password = req.body.passwordOld;
  User.findByUsernamePassword(username, password)
    .then((user) => {
      if (!user) {
        res.status(404).send("Old password incorrect");
      } else {
        user.set({ password: req.body.passwordNew });
        user
          .save()
          .then((result) => {
            res.send(result);
          })
          .catch((error) => {
            if (isMongoError(error)) {
              res.status(500).send("Internal server error");
            } else {
              log(error);
              res.status(400).send("Bad request");
            }
          });
      }
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal server error");
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  // Validate id
  if (!ObjectID.isValid(id)) {
    res.status(404).send("Resource not found");
    return;
  }
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }
  // Delete a user by their id
  User.findByIdAndRemove(id)
    .then((user) => {
      if (!user) {
        res.status(404).send();
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      log(error);
      res.status(500).send(); // server error, could not delete.
    });
});

// add Vaccination History of a user
app.post("/users/:id/vaccine", (req, res) => {
  const id = req.params.id;
  // Create a new user
  const vaccineHistroy = {
    name: req.body.name,
    dateofVaccination: new Date(req.body.dateofVaccination),
  };
  // validate ID
  if (!ObjectID.isValid(id)) {
    res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    return; // so that we don't run the rest of the handler.
  }
  // If id valid, findById
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("User not found");
        return;
      } else {
        user.vaccinationHistory.push(vaccineHistroy);
        return user;
      }
    })
    .then((user) => {
      const result = user.save();
      return result;
    })
    .then((result) => {
      if (!result) {
        res.status(404).send("Resource not found");
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      log(error);
      res.status(400).send("Bad Request"); // bad request for changing the student.
    });
});

// delete a Vaccination History from a user
app.delete("/users/:id/vaccine/:vid", (req, res) => {
  const id = req.params.id;
  const vid = req.params.vid;
  if (!ObjectID.isValid(id)) {
    res.status(404).send("invalid ID"); // if invalid id, definitely can't find resource, 404.
    return; // so that we don't run the rest of the handler.
  }
  if (!ObjectID.isValid(vid)) {
    res.status(404).send("Invalid ID"); // if invalid id, definitely can't find resource, 404.
    return; // so that we don't run the rest of the handler.
  }
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found");
      } else {
        const removed_his = user.vaccinationHistory.id(vid);
        user.vaccinationHistory.pull(removed_his);
        const result = user.save();
        return result;
      }
    })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

// ** Edit History of a user
app.put("/users/:id/vaccine/:vid", (req, res) => {
  const id = req.params.id;
  const vid = req.params.vid;

  if (!ObjectID.isValid(id)) {
    res.status(404).send("invalid ID"); // if invalid id, definitely can't find resource, 404.
    return; // so that we don't run the rest of the handler.
  }
  if (!ObjectID.isValid(vid)) {
    res.status(404).send("Invalid ID"); // if invalid id, definitely can't find resource, 404.
    return; // so that we don't run the rest of the handler.
  }
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found");
        return;
      } else {
        if (req.body.name) {
          user.vaccinationHistory.id(vid).name = req.body.name;
        }
        if (req.body.dateofVaccination) {
          user.vaccinationHistory.id(vid).dateofVaccination =
            req.body.dateofVaccination;
        }
        return user;
      }
    })
    .then((user) => {
      const result = user.save();
      return result;
    })
    .then((result) => {
      if (!result) {
        res.status(404).send("not found");
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      log(error);
      res.status(400).send("Bad Request"); // bad request for changing the student.
    });
});

/** Admin routes below **/
// Set up a POST route to *create* an admin
app.post("/admins/register", (req, res) => {
  log(req.body);

  // Create a new admin
  const admin = new Admin({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthdate: new Date(req.body.birthdate),
    gender: req.body.gender,
    licenceNum: req.body.licenceNum,
    organization: req.body.organization,
    phoneNum: req.body.phoneNum,
  });

  // Save the admin
  admin.save().then(
    (admin) => {
      req.session._id = admin._id;
      req.session.username = admin.username;
      req.session.isAdmin = true;
      res.send({ currentUser: admin._id });
    },
    (error) => {
      log(error);
      res.status(400).send(error); // 400 for bad request
    }
  );
});

// A GET route to get an admin by their id
app.get("/admins/:id", (req, res) => {
  const id = req.params.id;

  // Validate id immediately
  if (!ObjectID.isValid(id)) {
    // If invalid id, definitely can't find resource, 404
    res.status(404).send();
    return;
  }

  // Otherwise, findById
  Admin.findById(id)
    .then((admin) => {
      if (!admin) {
        // Could not find this admin
        res.status(404).send();
      } else {
        res.send(admin);
      }
    })
    .catch((error) => {
      // Server error
      res.status(500).send();
    });
});

// A PUT route to update Admin's information
app.put("/admins/:id", (req, res) => {
  const id = req.params.id;

  // Validate id
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  // Check mongoose connection
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  // Find admin by id and update the information
  Admin.findById(id)
    .then((admin) => {
      if (!admin) {
        res.status(404).send("User not found");
      } else {
        admin.set(req.body);
        admin
          .save()
          .then((result) => {
            res.send(result);
          })
          .catch((error) => {
            if (isMongoError(error)) {
              res.status(500).send("Internal server error");
            } else {
              log(error);
              res.status(400).send("Bad request");
            }
          });
      }
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal server error");
    });
});

// A PUT route to update Admin's password
app.put("/admins/:id/password", (req, res) => {
  const id = req.params.id;

  // Validate id
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  // Check mongoose connection
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  // Validate the old password first then update to the new password
  const username = req.body.username;
  const password = req.body.passwordOld;
  Admin.findByUsernamePassword(username, password)
    .then((admin) => {
      if (!admin) {
        res.status(404).send("Old password incorrect");
      } else {
        admin.set({ password: req.body.passwordNew });
        admin
          .save()
          .then((result) => {
            res.send(result);
          })
          .catch((error) => {
            if (isMongoError(error)) {
              res.status(500).send("Internal server error");
            } else {
              log(error);
              res.status(400).send("Bad request");
            }
          });
      }
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal server error");
    });
});

/** Booking routes below **/
// Set up a POST route to *create* a booking for the user

// Request body expects:
// {
//  "date": <date of the booking>
//  "time": <time of the booking>
//  "phoneNum": <default phone number of the user>
//  "temp_phoneNum": <temp phoneNum for the booking of the user>
// }
app.post("/users/:id/bookings", (req, res) => {
  // TO DO
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send("Resource not found");
    return;
  }

  const Booking = {
    date: req.body.date,
    time: req.body.time,
    phoneNum: req.body.phoneNum,
    temp_phoneNum: req.body.temp_phoneNum,
  };

  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found");
      } else {
        user.bookingHistory.push(Booking);
        user.save();

        res.send({
          booking: Booking,
          user: user,
        });
      }
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

/// Route for getting information for one user's booking history.
// GET /users/id/bookings
app.get("/users/:id/bookings", (req, res) => {
  // TO DO
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send("Resource not found");
    return;
  }

  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found");
      } else {
        //get all the bookings
        res.send(user.bookingHistory);
      }
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

// Returned JSON should have the updated restaurant database
//   document from which the reservation was deleted, AND the reservation subdocument deleted:
//   { "booking": <booking subdocument>, "user": <entire user document>}
// DELETE users/id/bookings/<booking_id>
app.delete("/users/:id/bookings/:bookingId", (req, res) => {
  const id = req.params.id;
  const booking_id = req.params.bookingId;

  if (!ObjectID.isValid(id)) {
    res.status(404).send("Resource not found");
    return;
  }

  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found");
      } else {
        const removed_booking = user.bookingHistory.id(booking_id);

        user.bookingHistory.pull(booking_id);
        user.save();

        res.send({
          booking: removed_booking,
          user: user,
        });
      }
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

/** Article routes below **/

/* Request body expects:
{
  "title1": <title>
  "date": <date YYYY/MM/DD>
  "author": <name>
  "contetn1": <serve as summary>
  "title2": <title2>
  "content2": <content>
  "title3": <title3>
  "content3": <content>
  "content4": <content>
 }
Set up a POST route to *create* an article on the homepage
*/
app.post("/articles", (req, res) => {
  log("111")

  // Create a new article
  const article = new Article({
    title1: req.body.title1,
    // summay: req.body.summary,
    date: req.body.date,
    author: req.body.author,
    content1: req.body.content1,
    title2: req.body.title2,
    content2: req.body.content2,
    title3: req.body.title3,
    content3: req.body.content3,
    content4: req.body.content4,
    
    // sections: [],
  });

  // Save the article
  article
    .save()
    .then((article) => {
      res.send(article);
    })
    .catch((error) => {
      // send msg instead later on
      res.status(400).send(error);
    });
});

//get all articles
app.get("/articles", (req, res) => {
  Article.find()
    .then((article) => {
      // console.log(typeof(article));
      res.send(article);
    })
    .catch((error) => {
      res.status(500).send();
    });
});

// get single article by id
app.get("/articles/:id", (req, res) => {
  // TO DO
  const artid = req.params.id;
  if (!ObjectID.isValid(artid)) {
    res.status(404).send();
    return;
  }
  Article.findById(artid)
    .then((article) => {
      if (!article) {
        res.status(404).send("article not found");
      } else {
        res.send(article);
      }
    })
    .catch((error) => {
      res.status(500).send("internal server error");
    });
});

// TO DO
app.delete("/articles/:id", (req, res) => {
  // TO DO
  const artid = req.params.id;
  if (!ObjectID.isValid(artid)) {
    res.status(404).send();
    return;
  }
  Article.findByIdAndRemove(artid)
    .then((article) => {
      if (!article) {
        res.status(404).send();
      } else {
        res.send(article);
      }
    })
    .catch((error) => {
      res.status(500).send();
    });
});

app.patch("/articles/:id", (req, res) => {
  const artid = req.params.id;
  if (!ObjectID.isValid(artid)) {
    res.status(404).send("not valid id");
    return;
  }
  Article.findById(artid)
    .then((article) => {
      if (!article) {
        res.status(404).send("article doesn't exist?");
      } else {
        // article.title = req.body.title;
        // article.date = req.body.date;
        // article.author = req.body.author;
        // article.sections = req.body.sections;
        article.title1 = req.body.title1;
        article.date = req.body.date;
        article.author = req.body.author;
        article.content1 = req.body.content1;
        article.title2 = req.body.title2;
        article.content2 = req.body.content2;
        article.title3 = req.body.title3;
        article.content3 = req.body.content3;
        article.content4 = req.body.content4;
        article.save();
        console.log(article.title1);
        res.send(article);
      }
    })
    .catch((error) => {
      res.status(500).send();
    });
});

// put request for editing article
app.put("/articles/:id", (req, res) => {
  const artid = req.params.id;

  if (!ObjectID.isValid(artid)) {
    res.status(404).send("invalide id");
    return;
  }
  Article.findById(artid)
    .then((article) => {
      if (!article) {
        res.status(404).send("Article doesn't exist");
        return;
      } else {
        if (req.body.title1) {
          article.title1 = req.body.title1;
        }
        if (req.body.date) {
          article.date = req.body.date;
        }
        if (req.body.author) {
          article.author = req.body.author;
        }
        if (req.body.content1) {
          article.content1 = req.body.content1;
        }
        if (req.body.title2) {
          article.title2 = req.body.title2;
        }
        if (req.body.content2) {
          article.content2 = req.body.content2;
        }
        if (req.body.title3) {
          article.title3 = req.body.title3;
        }
        if (req.body.content3) {
          article.content3 = req.body.content3;
        }
        if (req.body.content4) {
          article.content4 = req.body.content4;
        }
        return article;
      }
    })
    .then((article) => {
      const result = article.save();
      return article;
    })
    .then((result) => {
      if (!result) {
        res.status(404).send("could not save properly, edit not found");
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      log(error);
      req.status(500).send();
    });
});

// get All the recommended vaccines for EIR
app.get("/vaccines", (req, res) => {
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }
  Vaccine.find()
    .then((vaccines) => {
      res.send(vaccines);
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal Server Error");
    });
});

// Add a recommended vaccines for EIR ()
app.post("/vaccines", (req, res) => {
  // Create a new vaccine
  const vaccine = new Vaccine({
    name: req.body.name,
    effectiveTime: req.body.effectiveTime,
    info: req.body.info,
    recommendedCountry: req.body.recommendedCountry,
    recommendedGender: req.body.recommendedGender,
  });

  // Save the user
  vaccine.save().then(
    (vaccine) => {
      res.send(vaccine);
    },
    (error) => {
      log(error);
      res.status(400).send(); // 400 for bad request
    }
  );
});

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
  // check for page routes that we expect in the frontend to provide correct status code.
  const goodPageRoutes = ["/", "/login", "/dashboard/home"];
  if (!goodPageRoutes.includes(req.url)) {
    // if url not in expected page routes, set status to 404.

    res.status(404);
  }

  // send index.html
  res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
});
