import {test, expect} from "@playwright/test"

test.describe("Search results", () =>{
    test("Should find test search results", async ({ page }) =>{
        await page.goto("http://zero.webappsecurity.com/index.html")
        await page.type("#searchTerm", "bank")
        await page.keyboard.press("Enter")

        const numberOfLinks = await page.locator("li > a")
        await expect(numberOfLinks).toHaveCount(2)
    })
})