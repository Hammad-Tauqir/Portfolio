import { test, expect } from "@playwright/test";
test("four page layouts render without overflow or browser errors", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const [name, url, title] of [
    [
      "home",
      "/",
      "I build websites and AI automations that make business easier.",
    ],
    ["projects", "/projects", "Work built around real needs."],
    ["detail", "/projects/devlog", "DevLog."],
    ["contact", "/contact", "Let’s build something genuinely useful."],
  ]) {
    const response = await page.goto(url);
    expect(response?.status()).toBe(200);
    expect((await page.locator("h1").innerText()).replace(/\s+/g, "")).toBe(
      title.replace(/\s+/g, ""),
    );
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: testInfo.outputPath(`${name}.png`),
      fullPage: true,
      animations: "disabled",
      caret: "initial",
    });
    await page.screenshot({
      path: testInfo.outputPath(`${name}-viewport.png`),
      animations: "disabled",
      caret: "initial",
    });
  }
  expect(errors).toEqual([]);
});
test("filters include multi-category work and unfinished projects", async ({
  page,
}) => {
  await page.goto("/projects");
  await expect(page.locator(".workcard")).toHaveCount(7);
  await page
    .getByRole("button", { name: "AI Automation", exact: true })
    .click();
  await expect(page.locator(".workcard")).toHaveCount(3);
  await expect(page.locator(".progress-status")).toHaveCount(2);
  await page.getByRole("button", { name: "Full Stack", exact: true }).click();
  await expect(page.locator(".workcard")).toHaveCount(3);
  await page.getByRole("button", { name: "Frontend", exact: true }).click();
  await expect(page.locator(".workcard")).toHaveCount(1);
  await page.getByRole("button", { name: "Mobile", exact: true }).click();
  await expect(page.locator(".workcard")).toHaveCount(1);
  await page.getByRole("button", { name: "All work", exact: true }).click();
  await expect(page.locator(".workcard")).toHaveCount(7);
});
test("navigation works across routes", async ({ page, isMobile }) => {
  await page.goto("/projects");
  if (isMobile)
    await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/\/#about$/);
  if (isMobile) {
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toBeFocused();
  }
});
test("contact validates and never pretends an unconfigured message was sent", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByLabel("YOUR NAME")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await page.getByLabel("YOUR NAME").fill("Test Visitor");
  await page.getByLabel("EMAIL ADDRESS").fill("visitor@example.com");
  await page.getByLabel("SUBJECT", { exact: true }).fill("Portfolio inquiry");
  await page
    .getByLabel("YOUR MESSAGE")
    .fill("I would like to discuss a development project.");
  let requests = 0;
  page.on("request", (request) => {
    if (request.method() === "POST") requests++;
  });
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your message has not been sent",
  );
  expect(requests).toBe(0);
});
test("every case study and custom 404 resolve", async ({ page }) => {
  for (const slug of [
    "ai-receptionist",
    "devlog",
    "polymath-kids",
    "metaviz-landing",
    "banking-app",
    "email-automation",
    "order-management",
  ]) {
    const response = await page.goto(`/projects/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("navigation", { name: "Project navigation" }),
    ).toBeVisible();
  }
  await page.goto("/projects/missing-project");
  await expect(
    page.getByRole("heading", { name: "Nothing here yet." }),
  ).toBeVisible();
});
