const path = require('path');
const fs = require('fs');

try {
  let json = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../coverage/coverage-summary.json')));

  console.log('Coverage Summary: ');
  console.log(json.total);

  if (json.total.lines.pct < 75) {
    console.log('******************\n');
    console.log('Minimum coverage of 75% of lines covered was not met.');
    process.exitCode = 1;
    console.log('\n******************');
  } else {
    process.exitCode = 0;
  }
} catch (e) {
  console.log('******************\n');
  console.log('Cannot get test coverage report');
  console.log('\n******************');
  process.exitCode = 1;
}
