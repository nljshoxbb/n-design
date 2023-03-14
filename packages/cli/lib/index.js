"use strict";

var _commander = require("commander");
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(async () => {
  const program = new _commander.Command();
  try {
    // await checkVersion()
  } catch (error) {
    console.log(error);
  }
  const mapActions = {
    create: {
      alias: 'c',
      description: 'create a project 创建一个项目',
      examples: ['create <project-name>']
    },
    add: {
      alias: 'a',
      description: 'add a material 新增一个模块',
      examples: ['add <material-name>']
    },
    clean: {
      alias: 'cl',
      description: 'clean the cache in local disk',
      examples: ['clean']
    },
    '*': {
      alias: '',
      description: 'command not found',
      examples: []
    }
  };
  Reflect.ownKeys(mapActions).forEach(action => {
    const {
      alias,
      description
    } = mapActions[action];
    program.command(action).alias(alias).description(description)
    // .hook('preAction', () => {})
    .action(async () => {
      if (action === '*') {
        console.log(description);
      } else {
        require(_path.default.resolve(__dirname, action))(...process.argv.slice(2));
      }
    });
  });
  program.version('1.0.0').parse(process.argv);
})();