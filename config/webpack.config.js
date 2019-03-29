var chalk = require("chalk");
var fs = require('fs');
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');
var colors = require('colors');

var Build = process.env.BUILD;
var env = process.env.IONIC_ENV;
var pathConfig = path.resolve(environmentPath('dev'));

if (Build === "production") { //通过环境变量判断,为production则为生产，如果为非production则为测试
  pathConfig = path.resolve(environmentPath('prod'));
  console.log(colors.yellow("Production:", "Environment variables in file: " + pathConfig + " using for production build."));
} else if(Build === 'onlinetest') {
    pathConfig = path.resolve(environmentPath('online'));
    console.log(colors.yellow("Onlinetest:", "Environment variables in file: " + pathConfig + " using for onlinetest build."));
} else {
  console.log(colors.yellow("Test:", "Environment variables in file: " + pathConfig + " using for test build."));
}

useDefaultConfig[env].resolve.alias = {
  "@app/env": pathConfig
};

if (env !== 'prod' && env !== 'dev') {
  // Default to dev config
  useDefaultConfig[env] = useDefaultConfig.dev;
  useDefaultConfig[env].resolve.alias = {
    "@app/env": path.resolve(environmentPath(env))
  };
}

function environmentPath(env) {
  var filePath = './src/environments/environment' + (env === 'prod' ? '' : '.' + env) + '.ts';
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
  } else {
    return filePath;
  }
}
console.log(colors.yellow( "Build:" + Build));
console.log(colors.yellow( "evn:" + env));
module.exports = function () {
  return useDefaultConfig;
};