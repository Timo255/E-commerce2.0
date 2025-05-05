const setCache = function (req, res, next) {
  const period = 86400;

  // you only want to cache for GET requests
  if (req.method == "GET") {
    res.set("Cache-Control", `public, max-age=${period}`);
  } else {
    res.set("Cache-control", "no-store");
  }

  // remember to call next() to pass on the request
  next();
};

module.exports = setCache;
