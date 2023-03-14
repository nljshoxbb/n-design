"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = exports.fetchTagList = exports.fetchRepoList = exports.download = void 0;
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
  await downloadGitRepo(api, dest);
  return dest;
};
exports.download = download;