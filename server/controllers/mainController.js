// controllers/mainController.js

async function getMainData(req, res, next) {
    try {
      // Add your controller logic here
      return res.status(200).json({
        title: "Express Testing",
        message: "The app is working properly!",
      });
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  }
  
  module.exports = {
    getMainData,
  };
  