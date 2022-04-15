const accountTest = require("./user_account_org_test");
const pipelineTest = require("./pipelines_test");
const testCleanup = require("./test_cleanup");

// Centralize and order puppeteer tests to ensure they run in proper order
// accountTest();
// pipelineTest();
testCleanup();
