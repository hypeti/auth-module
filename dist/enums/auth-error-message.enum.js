"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthErrorMessage = void 0;
var AuthErrorMessage;
(function (AuthErrorMessage) {
    AuthErrorMessage["UNAUTHORIZED"] = "Unauthorized";
    AuthErrorMessage["INVALID_TOKEN"] = "Invalid token";
    AuthErrorMessage["EXPIRED"] = "The incoming token has expired";
    AuthErrorMessage["NO_PERMISSION"] = "You do not have permission to access this resource";
})(AuthErrorMessage || (exports.AuthErrorMessage = AuthErrorMessage = {}));
