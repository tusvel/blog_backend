import jwt from 'jsonwebtoken';

function checkAuth(req, res, next) {
  try {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
      try {
        const decoded = jwt.verify(token, 'secret123'); //TODO

        req.userId = decoded._id;
        next();
      } catch (e) {
        return res.status(403).json({
          message: 'Нет доступа',
        });
      }
    } else {
      return res.status(403).json({
        message: 'Нет доступа',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Ошибка проверки пользователя',
    });
  }
}

export { checkAuth };
