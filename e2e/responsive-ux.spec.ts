import { test, expect, devices } from "@playwright/test";

test.describe("Responsive UX Flow", () => {
  test.use({ ...devices["iPhone 13"] });

  test.beforeEach(async ({ page }) => {
    // Perform login
    await page.goto("/login");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/");
  });

  test("should show bottom navigation on mobile", async ({ page }) => {
    // Top Nav title should be visible (Culinary Curator)
    await expect(page.getByText("Culinary Curator")).toBeVisible();
    
    // Bottom Nav should be visible on mobile
    const bottomNav = page.locator("nav.fixed.bottom-0");
    await expect(bottomNav).toBeVisible();
  });

  test("should open create list modal from mobile FAB", async ({ page }) => {
    // Floating Action Button (FAB)
    const fab = page.locator('button:has-text("add")');
    await expect(fab).toBeVisible();
    
    await fab.click();
    
    // Modal should appear
    await expect(page.getByText("Nova Lista")).toBeVisible();
    await expect(page.getByPlaceholder("Ex: Compras do Mês")).toBeVisible();
  });

  test("should handle grid layout transition", async ({ page }) => {
    // On iPhone 13 (mobile), the grid should be 1 column
    const grid = page.locator(".grid");
    await expect(grid).toHaveClass(/grid-cols-1/);
  });
});
