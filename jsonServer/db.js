var route1 = require("./data/gym/gymArticles.json");
var route2 = require("./data/gym/gymComments.json");
var route3 = require("./data/gym/gymReviews.json");

module.exports = function () {
  return {
    gymArticles: route1,
    gymComments: route2,
    gymReviews: route3,
  };
};
