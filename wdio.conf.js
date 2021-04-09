const spawn = require('child_process').spawn
const fsExtra = require('fs-extra')


const replaceFreshCache=()=>{
  let cashDir = __dirname + "/hardhat-node/cache"
  let freshCashDir = __dirname + "/hardhat-node/fresh-cache"
  try{
    fsExtra.emptyDirSync(cashDir)
    fsExtra.copySync(freshCashDir, cashDir)
    console.log('Cache was updated successfully')
  }catch(err){
    console.log(`Cache wasn't updated, error: `+ err)
  }
}

const runHardHat=()=>{
  spawn('cd hardhat-node/; npx hardhat --max-memory 8000 node --hostname localhost --port 8545',
    {shell:true})
  setTimeout(() => {
  }, 7000);
}

const stopHardHat=()=>{
  spawn('kill -9 $(lsof -t -i:8545)', {shell:true})
}

exports.config = {
  runner: 'local',
  specs: [
    './e2e/specs/**/*.test.js',
  ],
  suites: {
    integration: [
      './e2e/specs/borrow.test.js',
      './e2e/specs/deposit.test.js'
    ]
  },
  exclude: [
    './e2e/specs/borrow.test.js',
    './e2e/specs/deposit.test.js'
  ],
  maxInstances: 5,
  capabilities: [{
      maxInstances: 5,
      browserName: 'chrome',
      'goog:chromeOptions': {
          args: [
              '--window-size=1920,1080',
              '--load-extension=./metamask/metamaskChrome',
          ],
      },
      acceptInsecureCerts: true
  }],
  logLevel: 'error',
  bail: 1,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
      ui: 'bdd',
      timeout: 90000,
  },
  onPrepare: function () {
    replaceFreshCache()
    runHardHat()
  },
  onComplete: function () {
    stopHardHat()
  },
  beforeTest: function () {
    const chai = require('chai')
    global.assert = chai.assert
    global.should = chai.should
    global.expect = chai.expect
  },
}
