import ora from 'ora';
import chalk from 'chalk';

export const runStep = async ({ title, steps }) => {
  const total = steps.length;
  const results = {};

  ora().info(chalk.yellow(`开始${title}...\n`));

  for (const [stepIndex, step] of steps.entries()) {
    const label = `${chalk.magenta(title)} ${chalk.cyan(`[${stepIndex + 1}/${total}]`)}`;

    const spinner = ora(`${label} ${step.text}`).start();

    try {
      const result = await step.exec({ results });
      const doneText = typeof step.successText === 'function'
        ? step.successText(result, { results })
        : step.successText;

      spinner.succeed(`${label} ${doneText || `${step.text}完成`}`);
      results[step.resultKey || stepIndex] = result;
    } catch (err) {
      spinner.fail(`${label} ${chalk.red(`${step.text}失败`)}`);
      throw err;
    }
  }

  ora().succeed(chalk.green(`${title}完成\n\n`));

  return results;
};
