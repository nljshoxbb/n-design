import { Command } from 'commander';
import path from 'path';
import type { IAction } from './index.d';

(async () => {
  const program = new Command();
  try {
    // await checkVersion()
  } catch (error) {
    console.log(error);
  }

  const mapActions: IAction = {
    create: {
      alias: 'c',
      description: 'create a project 创建一个项目',
      examples: ['create <project-name>'],
    },
    add: {
      alias: 'a',
      description: 'add a material 新增一个模块',
      examples: ['add <material-name>'],
    },
    clean: {
      alias: 'cl',
      description: 'clean the cache in local disk',
      examples: ['clean'],
    },
    '*': {
      alias: '',
      description: 'command not found',
      examples: [],
    },
  };

  Reflect.ownKeys(mapActions).forEach((action: any) => {
    const { alias, description } = mapActions[action];
    program
      .command(action)
      .alias(alias)
      .description(description)
      // .hook('preAction', () => {})
      .action(async () => {
        if (action === '*') {
          console.log(description);
        } else {
          require(path.resolve(__dirname, action))(...process.argv.slice(2));
        }
      });
  });
  program.version('1.0.0').parse(process.argv);
})();
