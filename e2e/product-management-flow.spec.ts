import { test, expect } from "@playwright/test";

test.describe("Product Management Flow", () => {
  const LIST_ID = "test-list-123";

  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.route("**/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ uid: "1", email: "lucas@gmail.com", name: "Lucas" }),
        headers: { "Set-Cookie": "session=test; HttpOnly" },
      });
    });

    // Mock shopping list detail
    await page.route(`**/shopping-list/${LIST_ID}`, async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          id: LIST_ID,
          title: "E2E List",
          description: "Test description",
          items: [
            { id: "p1", name: "Initial Product", quantity: 1, unit: "un", checked: false, category: "Geral" }
          ]
        }),
      });
    });

    // Login and navigate
    await page.goto("/login");
    await page.fill('input[id="email"]', "lucas@gmail.com");
    await page.fill('input[id="password"]', "99296463");
    await page.click('button[type="submit"]');

    await page.goto(`/products?listId=${LIST_ID}`);
    await expect(page.getByText("E2E List")).toBeVisible();
  });

  test("should add a new product to the list", async ({ page }) => {
    // Mock the product creation API
    await page.route("**/product", async (route) => {
      await route.fulfill({
        status: 201,
        body: JSON.stringify({ id: "p2", name: "New Tomato", quantity: 2, unit: "kg", checked: false }),
      });
    });

    // Fill the add product form
    await page.fill('input[name="item"]', "New Tomato");
    await page.fill('input[name="price"]', "5,50");
    await page.fill('input[name="quantity.quantity"]', "2");
    
    // Select category (Molecules/SelectCategory handles this)
    await page.click('button:has-text("Selecione")');
    await page.click('div:has-text("Hortifruti")');

    await page.click('button[type="submit"]:has-text("Adicionar")');

    // Verify success toast/message and product presence
    await expect(page.getByText("New Tomato")).toBeVisible();
  });

  test("should toggle product checked status", async ({ page }) => {
    // Mock the toggle API
    await page.route("**/product/p1/checked", async (route) => {
      await route.fulfill({ status: 200 });
    });

    const checkbox = page.locator('button[role="checkbox"]').first();
    await checkbox.click();

    // Verify visual state (checked)
    await expect(checkbox).toHaveAttribute("data-state", "checked");
  });

  test("should delete a product from the list", async ({ page }) => {
    // Mock the delete API
    await page.route("**/product/p1", async (route) => {
      await route.fulfill({ status: 200 });
    });

    // Click delete icon/button
    await page.click('button:has(span:text("delete"))');

    // Verify removal
    await expect(page.getByText("Initial Product")).not.toBeVisible();
  });
});
