import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const readmePath = path.join(__dirname, 'README.md');
  const readmeContents = fs.readFileSync(readmePath, {
    encoding: 'utf-8',
  });

  let [newDate, newTime] = new Date()
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '')
    .replace(/-/g, '/')
    .split(' ');

  newDate = newDate.split('/').reverse().join('/');

  const newDateTime = `${newDate} ${newTime}`;

  const newReadme = readmeContents.replace(
    /Updated: .*/,
    `Updated: ${newDateTime}`,
  );

  fs.writeFileSync(readmePath, newReadme);
})();
