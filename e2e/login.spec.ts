import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  test("should successfully login with valid credentials", async ({ page }) => {
    // Navigate to the login page
    await page.goto("/login");

    // Expect the login heading/title to be present or just the form
    await expect(page.locator("form")).toBeVisible();

    // Fill in the login form
    await page.fill('input[id="email"]', "lucas@gmail.com");
    await page.fill('input[id="password"]', "99296463");

    // Click the submit button
    await page.click('button[type="submit"]');

    // Wait for the redirection and check for dashboard elements
    // We expect to be redirected to the home page "/"
    await expect(page).toHaveURL("http://localhost:3000/");

    // Verify that we are logged in by checking for specific text on the home page
    // For example, "Minhas Listas" which I saw during the manual verification
    await expect(page.getByText("Minhas Listas")).toBeVisible();
  });

  test("should show error on landing page with invalid credentials", async ({ page }) => {
    await page.goto("/login");

    await page.fill('input[id="email"]', "wrong@gmail.com");
    await page.fill('input[id="password"]', "wrongpassword");
    await page.click('button[type="submit"]');

    // Expect an error message (this depends on the actual error text returned by the backend)
    // Common error container in the form
    const errorContainer = page.locator('.bg-error-container\\/20');
    await expect(errorContainer).toBeVisible();
  });
});
