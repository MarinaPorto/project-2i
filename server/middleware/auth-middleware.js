import ApiError from "../error/ApiError.js";
import tokenService from "../service/token-service.js";

function authCheck(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next()
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}

export default authCheck