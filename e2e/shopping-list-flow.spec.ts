import { test, expect } from "@playwright/test";

test.describe("Shopping List Flow", () => {
  test.beforeEach(async ({ page }) => {
    // 1. Login before each test
    await page.goto("/login");
    await page.fill('input[id="email"]', "lucas@gmail.com");
    await page.fill('input[id="password"]', "99296463");
    await page.click('button[type="submit"]');

    // Wait for the dashboard to load
    await expect(page).toHaveURL("http://localhost:3000/");
    await expect(page.getByText(/Minhas Listas/i)).toBeVisible();
  });

  test("should successfully create a new shopping list", async ({ page }) => {
    const listTitle = `E2E List - ${Date.now()}`;
    const listDescription = "Test description for E2E list";

    // 2. Click the "+" button to open the modal
    // The button has a span with text 'add'
    await page.click('button:has(span:text("add"))');

    // 3. Fill the modal form
    await expect(page.getByText(/Criar Lista de Compras/i)).toBeVisible();
    
    await page.fill('input[name="title"]', listTitle);
    await page.fill('textarea[name="description"]', listDescription);
    
    // Select a theme (e.g., 'Feira')
    await page.click('button:has-text("Feira")');

    // 4. Submit the form
    await page.click('button[type="submit"]:has-text("Criar")');

    // 5. Verify the list was created and appears in the grid
    // The modal should close automatically after success
    await expect(page.getByText(listTitle)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(listDescription)).toBeVisible();
  });

  test("should be able to cancel shopping list creation", async ({ page }) => {
    // 1. Open the modal
    await page.click('button:has(span:text("add"))');
    await expect(page.getByText(/Criar Lista de Compras/i)).toBeVisible();

    // 2. Click the cancel/close button
    await page.click('button:has(span:text("close"))');

    // 3. Verify the modal is closed
    await expect(page.getByText(/Criar Lista de Compras/i)).not.toBeVisible();
  });
});
