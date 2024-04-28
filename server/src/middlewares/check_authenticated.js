"use strict";
import jwt from "jsonwebtoken";
export default function (options) {
  return function (req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user;

      next();
    });
  };
}
