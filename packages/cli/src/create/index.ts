import inquirer from 'inquirer';
import { packageManagers } from '../utils/constants';
import {
  download,
  fetchRepoList,
  fetchTagList,
  getAll,
  gitInitRepo,
} from '../utils/git';
import { waitFnLoading } from '../utils/utils';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
import ncpOrigin from 'ncp';
import { promisify } from 'util';

const ncp = promisify(ncpOrigin);

module.exports = async function create(projectName: string) {
  // 1) 获取项目的模板 （所有的）
  let repos = await waitFnLoading(fetchRepoList, '获取 template ....')();
  repos = repos.map((item: any) => item.name);

  const { repo } = await inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: '请选择一个模板来创建工程',
    choices: repos,
  });
  // 2. 通过当前选择的项目 拉取对应的版本
  let tags = await waitFnLoading(fetchTagList, '获取 tags ....')(repo);
  tags = tags.map((item: any) => item.name);

  const { tag } = await inquirer.prompt({
    name: 'tag',
    type: 'list',
    message: '请选择一个tag来创建项目',
    choices: tags,
  });

  // 3. 把模板放到一个临时目录里，后期使用
  const result = await waitFnLoading(download, '下载 template')(repo, tag);

  // 4. 选择使用的包管理工具 npm/yarn/pnpm
  const { packageManagerName } = await inquirer.prompt({
    name: 'packageManagerName',
    type: 'list',
    message: '请选择一个包管理器来安装依赖',
    choices: packageManagers.map((item) => item.name),
  });

  const packageItem = packageManagers.find(
    (item) => item.name === packageManagerName,
  );

  const installDeps = () => {
    try {
      const templateDir = path.join(process.cwd(), projectName);
      process.chdir(templateDir);
      execSync(packageItem?.installCommand as string, { stdio: 'ignore' });
    } catch (error) {
      console.warn(packageItem?.installFailTip);
    }
  };
  const sucessTip = () => {
    console.log(`正在使用${packageItem?.name}安装模板依赖`);
    installDeps();
    gitInitRepo();
    console.log(`通过以下命令开始`);
    console.log();
    console.log(chalk.cyan(' cd'), projectName);
    console.log(`  ${chalk.cyan(`${packageItem?.name} start`)}`);
  };

  // 获取配置
  const CONF = await getAll();

  // 5 拷贝操作
  await ncp(result, path.resolve(projectName));
  sucessTip();
};
