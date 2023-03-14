"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitFnLoading = void 0;
var _ora = _interopRequireDefault(require("ora"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// 封装loading效果
const waitFnLoading = (fn, message) => async (...args) => {
  const spinner = (0, _ora.default)(message);
  spinner.start();
  const result = await fn(...args);
  spinner.succeed();
  return result;
};
exports.waitFnLoading = waitFnLoading;