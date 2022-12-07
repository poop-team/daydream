import { expect, test } from "@playwright/test";

test("can login", async ({ page }) => {
  await page.goto("https://daydream.wtf/");

  await page
    .getByPlaceholder("Enter your email address...")
    .fill("daydreamtest@robertboyd.dev");
  await page.getByPlaceholder("Enter your password...").fill("password");
  await page.getByRole("button", { name: "Log In" }).last().click();
  await page.waitForURL("https://daydream.wtf/feed");
  expect(page.url()).toEqual("https://daydream.wtf/feed");
});
