import { test, expect } from "@playwright/test"

test.describe.parallel("Login / Logout Flow", () => {
    //Before Hook

    test.beforeEach(async ({ page }) => {

        await page.goto("http://zero.webappsecurity.com/")
    })
    
    //Negative Scenario
    test("Negative Scenario for login", async ({ page }) => {
       await page.click("#signin_button")
       await page.type("#user_login", "invalid username")
       await page.type("#user_password", "invalid password")
       await page.click("text=Sign in")

       //await page.goto("http://zero.webappsecurity.com/index.html")

       const errorMessage = await page.locator(".alert-error")
       await expect(errorMessage).toContainText("Login and/or password are wrong")
    })

    //Positive Scenario + Logout
    test("Positive Scenario for login + logout", async ({ page }) => {
        await page.click("#signin_button")
        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.click("text=Sign in")

        const accountSummaryTab = await page.getByRole("link", {name: "Account Summary"})
        //await expect(accountSummaryTab).toBeVisible()

        await page.goto("http://zero.webappsecurity.com/logout.html")
        await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html")
    })
})