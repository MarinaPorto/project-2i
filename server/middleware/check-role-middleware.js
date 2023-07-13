import jwt from 'jsonwebtoken';

function roleCheck(role) {

  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1] // Bearer 
      if (!token) {
        return res.status(401).json({ message: "Не авторизован" })
      }
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      if (decoded.role !== role) {
        return res.status(403).json({ message: "Нет доступа" })
      }
      req.user = decoded;
      next()
    } catch (e) {
      res.status(401).json({ message: "Не авторизован catch" })
    }
  };
}

export default roleCheck
