module.exports = () => {
    describe('app', () => {
        beforeAll(async () => {
          await page.setViewport({ width: 1024, height: 768 });
        });
      
        beforeEach(async () => {
          await page.goto('http://localhost:3001');
        });
      
        it('login admin@example.com', async () => {
          await page.waitForSelector('input[aria-label="Email sign in input"]');
          await page.type('input[aria-label="Email sign in input"]', 'admin@example.com', { delay: 100 });
          await page.type('input[aria-label="Password sign in input"]', '1234567890', { delay: 100 });
          await page.keyboard.press('Enter');
      
          await page.waitForTimeout(3000);
      
          await expect(page).toMatchElement('div[aria-label="Pipelines page title"]', {
            text: 'Pipelines',
          });
        });

        it('removes Test Organization', async () => {
            await page.click('a[aria-label="Settings menu link"]');
            await page.waitForTimeout(1000);
        
            await page.click('li[aria-label="Edit Organization settings item"]');
            await page.waitForTimeout(1000);
        
            // click on add organization
            let elem = await page.$x('//label[contains(., "Test Organization")]');
            await page.waitForTimeout(1000);

            await elem[0].click();
            await page.waitForTimeout(1000);

            await page.click('.anticon-delete-outlined')
            await page.waitForTimeout(3000);

            await page.waitForSelector('div[class="ant-modal-content"]');
            await page.click('.ant-space-item .ant-btn-text');
            await page.waitForTimeout(1000);

            await page.type('.ant-modal-body .ant-input', 'Test Organization', { delay: 100 });
            await page.waitForTimeout(1000);

            await page.click('.ant-modal-body .delete');
            await page.waitForTimeout(1000);

            await page.click('.ant-modal-body .ant-btn');
            await page.waitForTimeout(1000);

          });

          it('logout admin@example.com', async () => {
            await page.click('div[aria-label="App dropdown"]');
            await page.waitForTimeout(1000);
            await page.click('a[aria-label="Log Out link"]');
          });
    });
}
