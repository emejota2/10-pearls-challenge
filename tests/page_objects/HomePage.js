
exports.HomePage = class HomePage {
    constructor(page) {
        this.page = page;

    }

    async navigate() {
        await this.page.goto('https://www.tutorialspoint.com/html/html_iframes.htm');
        // Accept cookies
        await this.page.setViewportSize({ width: 1200, height: 1000 });
    }

    async removeCookies() {
        //delete the cookies modal
        const dialogContainer = await this.page.waitForSelector('.fc-dialog-container', { state: 'visible' });
        // Check if the dialog container element is visible
        if (dialogContainer) {
            // If it's visible, find and click on the fc-button-label element
            await this.page.click('.fc-button-label');
        } else {
            console.log('Dialog container is not visible.');
        }
    }

    async accessToIframe() {
        const topframe = await this.page.frameLocator('iframe[src="/html/src/iframes.htm"]')
        const leftframebody = await topframe.frameLocator('iframe[src="/html/menu.htm"]').locator('body')
        return leftframebody;
    }

    async urlCurrentPage() {
        const newPageURL = this.page.url();
        console.log('URL of the new page:', newPageURL);
        return newPageURL;
    }

    async allUrlsCurrentPage() {
        //2. a list of all URLs on the page
        const allURLs = await this.page.$$eval('a', (links) => links.map((link) => link.href));
        console.log('List of all URLs on the page:', allURLs);
        return allURLs;
    }

    async allButtonsCurrentPage() {
        //3. a list of all buttons on the page
        const allButtons = await this.page.$$eval('button', (buttons) => buttons.map((button) => button.textContent));
        console.log('List of all buttons on the page:', allButtons);
        return allButtons;
    }

    async allInputTextCurrentPage() {
        //4. a a list of all text input fields on the page
        const allTextInputs = await this.page.$$eval('input[type="text"]', (inputs) => inputs.map((input) => input.className));
        console.log('List of all text input fields on the page:', allTextInputs);
        return allTextInputs;

    }

    async createFile({ fs, newPageURL, allURLs, allButtons, allTextInputs }) {
        // Output to an appended file
        const outputFile = 'output.txt';
        const outputData = `
        URL of the new page: ${newPageURL}
        List of all URLs on the page: ${allURLs.join(', ')}
        List of all buttons on the page: ${allButtons.join(', ')}
        List of all text input fields on the page: ${allTextInputs.join(', ')}
    `;

        fs.appendFile(outputFile, outputData, (err) => {
            if (err) throw err;
            console.log('Data has been appended to', outputFile);
        });
    }

};