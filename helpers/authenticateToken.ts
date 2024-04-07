import jwt from "jsonwebtoken"

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['Authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({message: "Bad Request"})

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err: any, user: any) => {
    console.log(err)

    if (err) return res.status(403).json({message: "User is not authorized"})

    req.user = user

    next()
  })
}