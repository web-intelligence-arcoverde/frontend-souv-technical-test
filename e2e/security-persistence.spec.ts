import { test, expect } from "@playwright/test";

test.describe("Security & Persistence Flow", () => {
  test("should redirect to login when accessing protected route unauthenticated", async ({ page }) => {
    // Attempt to access dashboard
    await page.goto("/");
    
    // Should be redirected to login
    await expect(page).toHaveURL("/login");
    await expect(page.getByText("Acesse sua conta")).toBeVisible();
  });

  test("should persist session after page refresh", async ({ page }) => {
    // Perform login
    await page.goto("/login");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    
    // Wait for redirect to dashboard
    await expect(page).toHaveURL("/");
    await expect(page.getByText("Minhas Listas")).toBeVisible();

    // Refresh page
    await page.reload();

    // Should still be on dashboard, not redirected to login
    await expect(page).toHaveURL("/");
    await expect(page.getByText("Minhas Listas")).toBeVisible();
  });

  test("should clear session after logout", async ({ page }) => {
    // Pre-condition: Logged in
    await page.goto("/login");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/");

    // Click logout
    await page.click('button:has-text("Sair")');

    // Should be redirected to login
    await expect(page).toHaveURL("/login");

    // Attempt to go back to dashboard
    await page.goto("/");
    await expect(page).toHaveURL("/login");
  });
});
