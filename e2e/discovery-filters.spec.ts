import { test, expect } from "@playwright/test";

test.describe("Discovery & Filters Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Perform login first
    await page.goto("/login");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/");
  });

  test("should filter lists by category in shared lists page", async ({ page }) => {
    // Go to shared lists page (ShoppingListView)
    await page.goto("/shopping-list");
    await expect(page.getByText("Listas Compartilhadas")).toBeVisible();

    // Mock API for filtered results
    await page.route("**/api/shopping-list?**", async (route) => {
      const url = new URL(route.request().url());
      const category = url.searchParams.get("category");

      if (category === "feira") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify([
            {
              id: "list-feira-1",
              title: "Feira de Domingo",
              description: "Itens para a semana",
              category: "Feira",
              variant: "primary",
              totalItems: 5,
              securedItems: 0,
              items: [],
              shared: true,
              lastModified: { _seconds: Date.now() / 1000, _nanoseconds: 0 },
            },
          ]),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify([]),
        });
      }
    });

    // Click on "Feira" category button in FilterBar
    // The label is "Feira" in SHOPPING_LIST_TYPES
    await page.click('button:has-text("Feira")');

    // Verify grid updates
    await expect(page.getByText("Feira de Domingo")).toBeVisible();
  });

  test("should toggle shared filter", async ({ page }) => {
    await page.goto("/shopping-list");
    
    // Default is shared: true
    const sharedButton = page.getByText("Compartilhadas");
    await expect(sharedButton.locator("..")).toHaveClass(/bg-secondary/);

    // Toggle off
    await sharedButton.click();
    await expect(sharedButton.locator("..")).not.toHaveClass(/bg-secondary/);
  });
});
