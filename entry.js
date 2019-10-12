const shell = require('child_process').execSync;
const Logger = require('@nestjs/common').Logger;
const src = `templates/`;
const dist = `dist/templates/`;

shell(`mkdir -p ${dist}`);
shell(`cp -r ${src}/* ${dist}`);
Logger.log('Templates Copied', 'EntryPoint');
