import { execSync } from 'child_process';
import { DEFAULTS_CONF, downloadDirectory, templateRepos } from './constants';
import fetch from 'node-fetch';
import downloadGitRepoOrigin from 'download-git-repo';
import { promisify } from 'util';

export const getAll = async (): Promise<any> => {
  return DEFAULTS_CONF;
};

const downloadGitRepo = promisify(downloadGitRepoOrigin);

export const fetchRepoList = async () => {
  return templateRepos.map((i) => ({ name: i }));
};

export const fetchTagList = async (repo: string) => {
  const CONF = await getAll();
  const res = await fetch(`${CONF.BASE}/repos/nljshoxbb/${repo}/tags`);

  const data = await res.json();
  return data;
};

export const download = async (repo: string, tag: string) => {
  let api = `nljshoxbb/${repo}`;
  if (tag) {
    api += `#${tag}`;
  }
  const dest = `${downloadDirectory}/${repo}`;
  console.log({ api, dest });
  await downloadGitRepo(api, dest);
  return dest;
};

export const isInitGitRepository = () => {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
};

export const tryGitInit = () => {
  try {
    execSync('git --version', { stdio: 'ignore' });
    if (isInitGitRepository()) {
      return false;
    }
    execSync('git init', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.warn('Git repo not initialized', error);
    return false;
  }
};

export const tryGitCommit = () => {
  try {
    execSync('git add -A', { stdio: 'ignore' });
    execSync(
      'git commit -m "chore🎉: Initialize project using @n-design/cli"',
      {
        stdio: 'ignore',
      },
    );
    return true;
  } catch (e) {
    console.warn('Git commit not created', e);
    console.warn('Removing .git directory...');
    return false;
  }
};

export const gitInitRepo = () => {
  let initializedGit = false;
  if (tryGitInit()) {
    initializedGit = true;
    console.log();
    console.log('Initialized a git repository.');
  }
  if (initializedGit && tryGitCommit()) {
    console.log();
    console.log('Created git commit.');
  }
};
