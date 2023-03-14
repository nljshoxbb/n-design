export const templateRepos = ['admin-react-template', 'admin-vue-template'];

export const DEFAULTS_CONF = {
  BASE: 'https://api.github.com',
};

// 存放用户的所需要的常量
export const { version, name } = require('../../package.json');

const HOME =
  process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE'];
// 存储模板的位置
export const downloadDirectory = `${HOME}/.nDesginCliTemplate`;

// 包管理工具选择
export const packageManagers = [
  {
    name: 'npm',
    installCommand: 'npm install',
    installFailTip:
      "use 'npm install --registry=https://registry.npm.taobao.org'",
  },
  {
    name: 'yarn',
    installCommand: 'yarn install',
    installFailTip:
      "use 'yarn install --registry=https://registry.npm.taobao.org'",
  },
  {
    name: 'pnpm',
    installCommand: 'pnpm install',
    installFailTip:
      "use 'pnpm install --registry=https://registry.npm.taobao.org'",
  },
];
