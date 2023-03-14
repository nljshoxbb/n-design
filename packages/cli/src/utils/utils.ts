import ora from 'ora';

// 封装loading效果
export const waitFnLoading =
  (fn: Function, message: string) =>
  async (...args: any) => {
    const spinner = ora(message);
    spinner.start();
    const result = await fn(...args);
    spinner.succeed();
    return result;
  };
