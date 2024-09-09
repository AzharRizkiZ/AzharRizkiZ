import * as fs from 'fs';
import * as path from 'path';

function formatDateTime(date: Date, timeZone: string): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
	      hour12: false, // Use 24-hour time format
        timeZoneName: 'short',
        timeZone: timeZone,
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
}

(async () => {
  const readmePath = path.join(__dirname, 'README.md');
  const readmeContents = fs.readFileSync(readmePath, {
    encoding: 'utf-8',
  });

  const utcPlus7 = 'Asia/Jakarta';

  let now = new Date();

  let nowUtcPlus7 = formatDateTime(now, utcPlus7);

  let [newDate, newTime] = nowUtcPlus7
    .replace(/GMT/, '')
    .replace(/\+7/, '')
    .replace(/\..+/, '')
    .replace(/-/g, '/')
    .split(', ');

  newDate = newDate.split('/').reverse().join('/');

  const newDateTime = `${newDate} ${newTime}`;

  const newReadme = readmeContents.replace(
    /Updated: .*/,
    `Updated: ${newDateTime} Western Indonesia Time`,
  );

  fs.writeFileSync(readmePath, newReadme);
})();
