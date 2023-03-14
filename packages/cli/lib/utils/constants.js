"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = exports.templateRepos = exports.packageManagers = exports.name = exports.downloadDirectory = exports.DEFAULTS_CONF = void 0;
const templateRepos = ['admin-react-template', 'admin-vue-template'];
exports.templateRepos = templateRepos;
const DEFAULTS_CONF = {
  BASE: 'https://api.github.com'
};

// 存放用户的所需要的常量
exports.DEFAULTS_CONF = DEFAULTS_CONF;
const {
  version,
  name
} = require('../../package.json');
exports.name = name;
exports.version = version;
const HOME = process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE'];
// 存储模板的位置
const downloadDirectory = `${HOME}/.nDesginCliTemplate`;

// 包管理工具选择
exports.downloadDirectory = downloadDirectory;
const packageManagers = [{
  name: 'npm',
  installCommand: 'npm install',
  installFailTip: "use 'npm install --registry=https://registry.npm.taobao.org'"
}, {
  name: 'yarn',
  installCommand: 'yarn install',
  installFailTip: "use 'yarn install --registry=https://registry.npm.taobao.org'"
}, {
  name: 'pnpm',
  installCommand: 'pnpm install',
  installFailTip: "use 'pnpm install --registry=https://registry.npm.taobao.org'"
}];
exports.packageManagers = packageManagers;