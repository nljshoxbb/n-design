import type { VersionInfo } from './../index.d';

// 缓存上一次的最新版本号以及本地版本号
let sessionCached: VersionInfo | undefined;
// 缓存上次版本号以及获取时间
let saveOptions = { latestVersion: '', lastChecked: 0 };

// async function getVersions(): Promise<VersionInfo> {}

async function checkVersion(): Promise<void> {
  // const {} = ver
}
