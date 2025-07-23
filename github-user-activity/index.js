#!/usr/bin/env node

const axios = require('axios');
const chalk = require('chalk');
const { program } = require('commander');

program
  .name('GitHub Activity CLI')
  .description('Fetch recent GitHub user activity')
  .version('1.0.0')
  .argument('<username>', 'GitHub username')
  .action(async (username) => {
    const url = `https://api.github.com/users/${username}/events/public`;

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'GitHub-CLI',
        },
      });

      const events = response.data.slice(0, 5); // show top 5 recent events
      console.log(chalk.green(`\nRecent GitHub Activity for ${username}:\n`));

      if (events.length === 0) {
        console.log(chalk.yellow('No recent public activity.'));
        return;
      }

      for (const event of events) {
        const type = event.type;
        const repo = event.repo.name;
        const time = new Date(event.created_at).toLocaleString();

        console.log(`${chalk.cyan(time)} — ${chalk.bold(type)} on ${chalk.magenta(repo)}`);
      }

    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error(chalk.red(`User "${username}" not found.`));
      } else {
        console.error(chalk.red('Error fetching data from GitHub:'), error.message);
      }
    }
  });

program.parse();
