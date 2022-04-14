import accountTest from "./user_account_org.test";
import pipelineTest from "./pipelines.test";
import testCleanup from "./test_cleanup.test";

// Centralize and order puppeteer tests to ensure they run in proper order
accountTest();
pipelineTest();
testCleanup();
