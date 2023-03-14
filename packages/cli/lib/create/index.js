"use strict";

var _inquirer = _interopRequireDefault(require("inquirer"));
var _constants = require("../utils/constants");
var _git = require("../utils/git");
var _utils = require("../utils/utils");
var _path = _interopRequireDefault(require("path"));
var _child_process = require("child_process");
var _chalk = _interopRequireDefault(require("chalk"));
var _ncp = _interopRequireDefault(require("ncp"));
var _util = require("util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ncp = (0, _util.promisify)(_ncp.default);
module.exports = async function create(projectName) {
  // 1) 获取项目的模板 （所有的）
  let repos = await (0, _utils.waitFnLoading)(_git.fetchRepoList, '获取 template ....')();
  repos = repos.map(item => item.name);
  const {
    repo
  } = await _inquirer.default.prompt({
    name: 'repo',
    type: 'list',
    message: '请选择一个模板来创建工程',
    choices: repos
  });
  // 2. 通过当前选择的项目 拉取对应的版本
  let tags = await (0, _utils.waitFnLoading)(_git.fetchTagList, '获取 tags ....')(repo);
  tags = tags.map(item => item.name);
  const {
    tag
  } = await _inquirer.default.prompt({
    name: 'tag',
    type: 'list',
    message: '请选择一个tag来创建项目',
    choices: tags
  });

  // 3. 把模板放到一个临时目录里，后期使用
  const result = await (0, _utils.waitFnLoading)(_git.download, '下载 template')(repo, tag);

  // 4. 选择使用的包管理工具 npm/yarn/pnpm
  const {
    packageManagerName
  } = await _inquirer.default.prompt({
    name: 'packageManagerName',
    type: 'list',
    message: '请选择一个包管理器来安装依赖',
    choices: _constants.packageManagers.map(item => item.name)
  });
  const packageItem = _constants.packageManagers.find(item => item.name === packageManagerName);
  const installDeps = () => {
    try {
      const templateDir = _path.default.join(process.cwd(), projectName);
      process.chdir(templateDir);
      (0, _child_process.execSync)(packageItem?.installCommand, {
        stdio: 'ignore'
      });
    } catch (error) {
      console.warn(packageItem?.installFailTip);
    }
  };
  const sucessTip = () => {
    console.log(`正在使用${packageItem?.name}安装模板依赖`);
    installDeps();
    (0, _git.gitInitRepo)();
    console.log(`通过以下命令开始`);
    console.log();
    console.log(_chalk.default.cyan(' cd'), projectName);
    console.log(`  ${_chalk.default.cyan(`${packageItem?.name} start`)}`);
  };

  // 获取配置
  const CONF = await (0, _git.getAll)();

  // 5 拷贝操作
  await ncp(result, _path.default.resolve(projectName));
  sucessTip();
};