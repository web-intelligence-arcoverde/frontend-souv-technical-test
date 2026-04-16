import { test, expect } from "@playwright/test";

test.describe("Register Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test("should show validation errors for empty fields", async ({ page }) => {
    await page.click('button[type="submit"]');

    await expect(page.getByText(/O nome deve ter pelo menos 2 caracteres/i)).toBeVisible();
    await expect(page.getByText(/Email inválido/i)).toBeVisible();
    await expect(page.getByText(/A senha deve ter pelo menos 6 caracteres/i)).toBeVisible();
  });

  test("should show error when passwords do not match", async ({ page }) => {
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.fill('#confirmPassword', 'differentpassword');
    
    await page.click('button[type="submit"]');

    await expect(page.getByText(/As senhas não coincidem/i)).toBeVisible();
  });

  test("should successfully register a new user", async ({ page }) => {
    const uniqueEmail = `test-${Date.now()}@example.com`;
    
    await page.fill('#name', 'E2E Test User');
    await page.fill('#email', uniqueEmail);
    await page.fill('#password', 'safePassword123');
    await page.fill('#confirmPassword', 'safePassword123');

    await page.click('button[type="submit"]');

    // After registration, we expect to be redirected to the home page or dashboard
    await expect(page).toHaveURL("http://localhost:3000/");
    await expect(page.getByText(/Minhas Listas/i)).toBeVisible();
  });

  test("should navigate back to login page", async ({ page }) => {
    await page.click('a[href="/login"]');
    await expect(page).toHaveURL("http://localhost:3000/login");
  });
});
