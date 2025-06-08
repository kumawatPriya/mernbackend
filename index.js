const userInfo = require("./mongooseSchema");
const cards = require("./createSchema");
const deletedPackageHistory = require("./HistorySchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const server = require("./src/server");
const specialPackageRoutes = require('./src/routes/specialPackage.routes');
const uploadImageRoutes = require('./src/routes/uploadImage.route');
const HolidaypackageRoutes = require('./src/routes/holidayPackage.routes');
const DetailedpackageRoutes = require('./src/routes/PackageDetails.route');
const PackageByInterest = require('./src/routes/PackageByInterest.route');
const JWT_SECRET = process.env.JWT_SECRET || "qwertyui1256789jhgfdsaSecretKey";

//  for save Signup user data in database.... =======================================

server.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await userInfo.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered." });
    }
    const newUser = new userInfo({ email, password });
    const savedUser = await newUser.save();
    console.log(savedUser, "savedUser");

    const token = jwt.sign({ userId: savedUser.userId }, JWT_SECRET);
    res.status(201).json({
      message: "User Created Successfully",
      userId: savedUser.userId,
      token,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message || err });
  }
});

// for find Data in Database ==============================

server.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userInfo.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found, Please Sign Up first.",
      });
    }
    if (user.password !== password) {
      return res.status(401).json({
        status: false,
        message: "Incorrect Passowrd!",
      });
    }
    const token = jwt.sign({ userId: user.userId }, JWT_SECRET);
    const {
      userId,
      email: userEmail,
      password: userPassword,
      createdOn,
    } = user.toObject();

    res.status(200).json({
      message: "Login Successful!",
      status: true,
      userId,
      email: userEmail,
      password: userPassword,
      createdOn,
      token,
    });
  } catch (err) {
    console.log("Login Error", err);
    res.status(500).json({
      message: "Something went wrong, please try again.",
      status: false,
      error: err,
    });
  }
});

server.get("/userLogin", async (req, res) => {
  const userLogin = await userInfo.find(req.body);
  res.send(userLogin);
});
// for card creation ======================================================
server.post("/create", async (req, res) => {
  const cardData = new cards();
  cardData.image = req.body.image;
  cardData.title = req.body.title;
  cardData.subtitle = req.body.subtitle;
  cardData.days = req.body.days;
  cardData.price = req.body.price;
  cardData.destination = req.body.destination;
  cardData.button = req.body.button;
  console.log(req.body);
  res.json(req.body);
  const travelCard = await cardData.save();
  console.log(travelCard, "trevelcard");
});

// for get data ============================
server.get("/travelCards", async (req, res) => {
  const travelcards = await cards.find();
  res.send(travelcards);
});

// ================================= CRUD OPERATION ===================================//

// 1. For Delete Data in Database ===================================

server.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTravelInfo = await cards.findByIdAndDelete(id);
    console.log(deleteTravelInfo, "deleteTravelInfo");
    if (deleteTravelInfo) {
      const deletedPackage = new deletedPackageHistory({
        image: deleteTravelInfo.image,
        title: deleteTravelInfo.title,
        subtitle: deleteTravelInfo.subtitle,
        days: deleteTravelInfo.days,
        price: deleteTravelInfo.price,
        destination: deleteTravelInfo.destination,
        button: deleteTravelInfo.button,
      });

      await deletedPackage.save();

      res.status(200).json({
        deleteTravelInfo: deleteTravelInfo,
        status: true,
        message: "Travel Package is deleted....",
      });
    } else {
      res.status(404).json({ message: "Package not found" });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({
      error: e,
      message: "Something went wrong....",
    });
  }
});

// 2. For Update Travellers Package Info ==============================================

server.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatePackage = await cards.findByIdAndUpdate(id, req.body);
    console.log("updatePackage", updatePackage);
    res.json(req.body);
  } catch (e) {
    res.status(404).json(e);
  }
});

// for get data in react through map by particular id Data ==============================

server.get("/package/:id", async (req, res) => {
  const id = req.params.id;
  const packageInfo = await cards.findOne({ _id: id });
  res.json({ packageInfo: packageInfo });
  console.log(packageInfo);
});

server.get("/read/:id", async (req, res) => {
  const id = req.params.id;
  const readInfo = await cards.findOne({ _id: id });
  res.json({ readInfo: readInfo });
  console.log(readInfo);
});

server.use('/api', specialPackageRoutes);
server.use('/api', uploadImageRoutes);
server.use('/api', HolidaypackageRoutes);
server.use('/api', HolidaypackageRoutes);
server.use('/api', DetailedpackageRoutes);
server.use('/api', PackageByInterest);

const port = process.env.PORT || 1100;
console.log(port, 'port')
server.listen(port, () => {
  try {
    console.log(`Server listening on ${port}`);
  } catch (error){
    console.log("Can't Connected to Server");
  }
});
