# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: product-management-flow.spec.ts >> Product Management Flow >> should delete a product from the list
- Location: e2e/product-management-flow.spec.ts:79:7

# Error details

```
Test timeout of 60000ms exceeded while running "beforeEach" hook.
```

```
Error: page.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('input[id="email"]')

```

# Page snapshot

```yaml
- generic [ref=e2]: "{\"uid\":\"1\",\"email\":\"lucas@gmail.com\",\"name\":\"Lucas\"}"
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Product Management Flow", () => {
  4  |   const LIST_ID = "test-list-123";
  5  | 
  6  |   test.beforeEach(async ({ page }) => {
  7  |     // Mock authentication
  8  |     await page.route("**/login", async (route) => {
  9  |       await route.fulfill({
  10 |         status: 200,
  11 |         contentType: "application/json",
  12 |         body: JSON.stringify({ uid: "1", email: "lucas@gmail.com", name: "Lucas" }),
  13 |         headers: { "Set-Cookie": "session=test; HttpOnly" },
  14 |       });
  15 |     });
  16 | 
  17 |     // Mock shopping list detail
  18 |     await page.route(`**/shopping-list/${LIST_ID}`, async (route) => {
  19 |       await route.fulfill({
  20 |         status: 200,
  21 |         body: JSON.stringify({
  22 |           id: LIST_ID,
  23 |           title: "E2E List",
  24 |           description: "Test description",
  25 |           items: [
  26 |             { id: "p1", name: "Initial Product", quantity: 1, unit: "un", checked: false, category: "Geral" }
  27 |           ]
  28 |         }),
  29 |       });
  30 |     });
  31 | 
  32 |     // Login and navigate
  33 |     await page.goto("/login");
> 34 |     await page.fill('input[id="email"]', "lucas@gmail.com");
     |                ^ Error: page.fill: Test timeout of 60000ms exceeded.
  35 |     await page.fill('input[id="password"]', "99296463");
  36 |     await page.click('button[type="submit"]');
  37 | 
  38 |     await page.goto(`/products?listId=${LIST_ID}`);
  39 |     await expect(page.getByText("E2E List")).toBeVisible();
  40 |   });
  41 | 
  42 |   test("should add a new product to the list", async ({ page }) => {
  43 |     // Mock the product creation API
  44 |     await page.route("**/product", async (route) => {
  45 |       await route.fulfill({
  46 |         status: 201,
  47 |         body: JSON.stringify({ id: "p2", name: "New Tomato", quantity: 2, unit: "kg", checked: false }),
  48 |       });
  49 |     });
  50 | 
  51 |     // Fill the add product form
  52 |     await page.fill('input[name="item"]', "New Tomato");
  53 |     await page.fill('input[name="price"]', "5,50");
  54 |     await page.fill('input[name="quantity.quantity"]', "2");
  55 |     
  56 |     // Select category (Molecules/SelectCategory handles this)
  57 |     await page.click('button:has-text("Selecione")');
  58 |     await page.click('div:has-text("Hortifruti")');
  59 | 
  60 |     await page.click('button[type="submit"]:has-text("Adicionar")');
  61 | 
  62 |     // Verify success toast/message and product presence
  63 |     await expect(page.getByText("New Tomato")).toBeVisible();
  64 |   });
  65 | 
  66 |   test("should toggle product checked status", async ({ page }) => {
  67 |     // Mock the toggle API
  68 |     await page.route("**/product/p1/checked", async (route) => {
  69 |       await route.fulfill({ status: 200 });
  70 |     });
  71 | 
  72 |     const checkbox = page.locator('button[role="checkbox"]').first();
  73 |     await checkbox.click();
  74 | 
  75 |     // Verify visual state (checked)
  76 |     await expect(checkbox).toHaveAttribute("data-state", "checked");
  77 |   });
  78 | 
  79 |   test("should delete a product from the list", async ({ page }) => {
  80 |     // Mock the delete API
  81 |     await page.route("**/product/p1", async (route) => {
  82 |       await route.fulfill({ status: 200 });
  83 |     });
  84 | 
  85 |     // Click delete icon/button
  86 |     await page.click('button:has(span:text("delete"))');
  87 | 
  88 |     // Verify removal
  89 |     await expect(page.getByText("Initial Product")).not.toBeVisible();
  90 |   });
  91 | });
  92 | 
```