"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tryGitInit = exports.tryGitCommit = exports.isInitGitRepository = exports.gitInitRepo = exports.getAll = exports.fetchTagList = exports.fetchRepoList = exports.download = void 0;
var _child_process = require("child_process");
var _constants = require("./constants");
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _downloadGitRepo = _interopRequireDefault(require("download-git-repo"));
var _util = require("util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getAll = async () => {
  return _constants.DEFAULTS_CONF;
};
exports.getAll = getAll;
const downloadGitRepo = (0, _util.promisify)(_downloadGitRepo.default);
const fetchRepoList = async () => {
  return _constants.templateRepos.map(i => ({
    name: i
  }));
};
exports.fetchRepoList = fetchRepoList;
const fetchTagList = async repo => {
  const CONF = await getAll();
  const res = await (0, _nodeFetch.default)(`${CONF.BASE}/repos/nljshoxbb/${repo}/tags`);
  const data = await res.json();
  return data;
};
exports.fetchTagList = fetchTagList;
const download = async (repo, tag) => {
  let api = `nljshoxbb/${repo}`;
  if (tag) {
    api += `#${tag}`;
  }
  const dest = `${_constants.downloadDirectory}/${repo}`;
  console.log({
    api,
    dest
  });
  await downloadGitRepo(api, dest);
  return dest;
};
exports.download = download;
const isInitGitRepository = () => {
  try {
    (0, _child_process.execSync)('git rev-parse --is-inside-work-tree', {
      stdio: 'ignore'
    });
    return true;
  } catch (e) {
    return false;
  }
};
exports.isInitGitRepository = isInitGitRepository;
const tryGitInit = () => {
  try {
    (0, _child_process.execSync)('git --version', {
      stdio: 'ignore'
    });
    if (isInitGitRepository()) {
      return false;
    }
    (0, _child_process.execSync)('git init', {
      stdio: 'ignore'
    });
    return true;
  } catch (error) {
    console.warn('Git repo not initialized', error);
    return false;
  }
};
exports.tryGitInit = tryGitInit;
const tryGitCommit = () => {
  try {
    (0, _child_process.execSync)('git add -A', {
      stdio: 'ignore'
    });
    (0, _child_process.execSync)('git commit -m "chore🎉: Initialize project using @n-design/cli"', {
      stdio: 'ignore'
    });
    return true;
  } catch (e) {
    console.warn('Git commit not created', e);
    console.warn('Removing .git directory...');
    return false;
  }
};
exports.tryGitCommit = tryGitCommit;
const gitInitRepo = () => {
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
exports.gitInitRepo = gitInitRepo;