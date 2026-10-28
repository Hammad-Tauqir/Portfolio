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
      "I build websites and automations that make business easier.",
    ],
    ["projects", "/projects", "Explore the projects."],
    ["detail", "/projects/concept-science-academy", "Concept Science Academy."],
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
  await expect(page.getByText("Banking Management App")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Mobile", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Automation", exact: true }).click();
  await expect(page.locator(".workcard")).toHaveCount(3);
  await expect(page.locator(".progress-status")).toHaveCount(2);
  await page.getByRole("button", { name: "Full Stack", exact: true }).click();
  await expect(page.locator(".workcard")).toHaveCount(3);
  await expect(
    page.getByText("MetaViz Mobile App Landing Website"),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Frontend", exact: true }).click();
  await expect(page.locator(".workcard")).toHaveCount(1);
  await expect(
    page.getByText("MetaViz Mobile App Landing Website"),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "All projects", exact: true })
    .click();
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
test("contact form submits and reports delivery status", async ({
  page,
}) => {
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "Email delivery is not configured yet. Your enquiry was not sent." }),
    });
  });
  await page.goto("/contact");
  const form = page.getByRole("form", { name: "Project enquiry form" });
  await expect(form).toBeVisible();
  await expect(form).toHaveAttribute("data-ready", "true");
  await expect(form.getByLabel("Your name *")).toBeVisible();
  await expect(form.getByLabel("Email address *")).toBeVisible();
  await expect(form.getByLabel("What do you need? (optional)")).toBeVisible();
  await expect(form.getByLabel("Timeline")).toHaveCount(0);
  await expect(form.getByLabel("Budget range")).toHaveCount(0);
  await expect(form.getByLabel("Existing website or reference link")).toHaveCount(0);
  await expect(form.getByLabel("Tell me about your project *")).toBeVisible();
  if ((await form.getAttribute("data-delivery-ready")) === "true") {
    await expect(form.getByRole("button", { name: /Send enquiry/ })).toBeEnabled();
    await form.getByLabel("Your name *").fill("Test Person");
    await form.getByLabel("Email address *").fill("test@example.com");
    await form.getByLabel("Tell me about your project *").fill("I would like to discuss a new website project.");
    await form.getByRole("button", { name: /Send enquiry/ }).click();
    await expect(form.getByRole("status")).toContainText("not sent");

    await page.unroute("**/api/contact");
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Your enquiry was sent successfully." }),
      });
    });
    await form.getByRole("button", { name: /Send enquiry/ }).click();
    await expect(form.getByRole("status")).toContainText("sent successfully");
    await expect(form.getByLabel("Your name *")).toBeEmpty();
  } else {
    await expect(form.getByRole("button", { name: /Send enquiry/ })).toBeDisabled();
    await expect(form.getByRole("status")).toContainText("not configured yet");
  }
  await expect(
    page.locator('.contact-options a[href="https://github.com/Hammad-Tauqir"]'),
  ).toBeVisible();
  await page.goto("/");
  await expect(page.getByRole("form", { name: "Project enquiry form" })).toBeVisible();
  await page.goto("/projects/ai-receptionist");
  await page.getByRole("link", { name: "Request Demo Access" }).click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator("#contact .contact-options")).toBeVisible();
});

test("contact endpoint validates enquiries", async ({ request }) => {
  const invalid = await request.post("/api/contact", {
    data: { name: " ", email: "invalid", projectType: "Unknown", message: "short" },
  });
  expect(invalid.status()).toBe(400);
  expect((await invalid.json()).fields).toEqual({
    name: expect.any(String),
    email: expect.any(String),
    projectType: expect.any(String),
    message: expect.any(String),
  });

  const malformed = await request.post("/api/contact", {
    data: "{invalid",
    headers: { "Content-Type": "application/json" },
  });
  expect(malformed.status()).toBe(400);

  const bot = await request.post("/api/contact", {
    data: {
      name: "Test Person",
      email: "test@example.com",
      message: "I would like to discuss a new website project.",
      website: "https://spam.example",
    },
  });
  expect(bot.status()).toBe(200);
});
test("every project and custom 404 resolve", async ({ page }) => {
  for (const slug of [
    "ai-receptionist",
    "concept-science-academy",
    "polymath-kids",
    "mobile-app-marketing-lead-capture",
    "design-review-client-feedback",
    "email-automation",
    "order-management",
  ]) {
    const response = await page.goto(`/projects/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("navigation", { name: "Project navigation" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(
      page.getByText("Detailed implementation notes will be added", {
        exact: false,
      }),
    ).toHaveCount(0);
  }
  await page.goto("/projects/banking-app");
  await expect(
    page.getByRole("heading", { name: "Nothing here yet." }),
  ).toBeVisible();
  await page.goto("/projects/missing-project");
  await expect(
    page.getByRole("heading", { name: "Nothing here yet." }),
  ).toBeVisible();
});

test("team design-review project stays attributed and private", async ({
  page,
}, testInfo) => {
  await page.goto("/projects");
  const card = page.getByRole("link", {
    name: "View details for Design Review & Client Feedback Platform",
  });
  await expect(card).toContainText("Contributed team roles, visitor insights");
  const thumbnail = card.locator("img");
  await expect(thumbnail).toHaveAttribute("src", /hsvs-design-review-demo-poster/);
  await thumbnail.scrollIntoViewIfNeeded();
  await expect.poll(() => thumbnail.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(thumbnail).toHaveCSS("object-fit", "contain");
  const watchDemo = page.locator(".workcard").filter({ has: card }).getByRole("link", { name: "Watch Demo" });
  await expect(watchDemo).toHaveAttribute("href", "/projects/design-review-client-feedback#demo-video");
  await watchDemo.click();
  await expect(page).toHaveURL(/\/projects\/design-review-client-feedback#demo-video$/);
  const video = page.locator("#demo-video video");
  await expect(video).toBeVisible();
  await expect(video).toHaveAttribute("poster", "/images/projects/hsvs-design-review-demo-poster.webp");
  await expect(video).toHaveAttribute("preload", "metadata");
  await expect(video).toHaveAttribute("playsinline", "");
  await expect(video.locator("source")).toHaveAttribute("src", "/videos/hsvs-design-review-demo-4.mp4");
  await expect.poll(() => video.evaluate((element) => (element as HTMLVideoElement).duration)).toBeGreaterThan(77);
  expect(await video.evaluate((element) => (element as HTMLVideoElement).duration)).toBeLessThan(79);
  expect(await video.evaluate((element) => (element as HTMLVideoElement).paused)).toBe(true);
  expect(await video.evaluate((element) => (element as HTMLVideoElement).autoplay)).toBe(false);
  expect(await video.evaluate((element) => (element as HTMLVideoElement).controls)).toBe(true);
  const videoBox = await video.boundingBox();
  expect(videoBox!.width / videoBox!.height).toBeCloseTo(16 / 9, 1);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Design Review & Client Feedback Platform",
  );
  for (const heading of [
    "My role",
    "Main contributions",
    "Technical highlights",
    "Outcome",
    "Screenshots",
  ]) {
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }
  for (const contribution of [
    "Team accounts & permissions.",
    "Client visits & heatmaps.",
    "Review canvas interactions.",
    "Screen updates across rounds.",
    "More reliable design capture.",
  ]) {
    await expect(page.getByText(contribution, { exact: true })).toBeVisible();
  }
  await expect(page.locator(".case-attribution")).toContainText(
    "team-built product",
  );
  await expect(
    page.getByText("self-declared, not verified", { exact: false }),
  ).toBeVisible();
  await expect(page.locator(".preview .illustration-label")).toHaveCount(0);
  await expect(page.locator(".case-hero img")).toHaveCount(1);
  const designScreenshots = page.locator(".screenshots img");
  await expect(designScreenshots).toHaveCount(3);
  for (const [index, image, height] of [
    [0, "design-review-dashboard.png", "2000"],
    [1, "design-review-canvas.png", "2000"],
    [2, "design-review-analytics.png", "4450"],
  ] as const) {
    await expect(designScreenshots.nth(index)).toHaveAttribute(
      "src",
      new RegExp(image),
    );
    await expect(designScreenshots.nth(index)).toHaveAttribute("width", "3200");
    await expect(designScreenshots.nth(index)).toHaveAttribute("height", height);
  }
  await expect(
    page.locator('.project-links a[href="https://mockup.metaviz.pro/"]'),
  ).toHaveCount(1);
  await expect(page.getByText("Sign-in required to view projects.")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("design-review.png"),
    fullPage: true,
    animations: "disabled",
  });
});

test("project thumbnails fill their cards while screenshots keep their proportions", async ({
  page,
}) => {
  await page.goto("/projects");
  const thumbnails = page.locator(".workcard .project-image");
  expect(await thumbnails.count()).toBeGreaterThan(0);
  for (const thumbnail of await thumbnails.all()) {
    const showFullFrame = await thumbnail.evaluate((image) => Boolean(image.closest(".video-preview, .academy")));
    await expect(thumbnail).toHaveCSS("object-fit", showFullFrame ? "contain" : "cover");
  }

  await page.goto("/projects/mobile-app-marketing-lead-capture");
  const screenshots = page.locator(".screenshots img");
  await expect(screenshots).toHaveCount(3);
  for (const screenshot of await screenshots.all()) {
    await screenshot.scrollIntoViewIfNeeded();
    await expect.poll(() => screenshot.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    const dimensions = await screenshot.evaluate((image) => {
      const img = image as HTMLImageElement;
      return {
        rendered: img.getBoundingClientRect().width / img.getBoundingClientRect().height,
        natural: img.naturalWidth / img.naturalHeight,
      };
    });
    expect(Math.abs(dimensions.rendered - dimensions.natural)).toBeLessThan(0.02);
  }
});

test("academy keeps its logo cover and shows its demo and screenshots", async ({ page }) => {
  await page.goto("/");
  const featured = page.locator(".feature").filter({ has: page.getByRole("heading", { name: "Concept Science Academy", exact: true }) });
  await expect(featured.getByRole("link", { name: "Watch Demo" })).toHaveAttribute("href", "/projects/concept-science-academy#demo-video");
  await page.goto("/projects");
  const card = page.locator(".workcard").filter({ has: page.getByRole("heading", { name: "Concept Science Academy", exact: true }) });
  await expect(card.locator("img")).toHaveAttribute("src", /concept-science-academy-logo/);
  await card.getByRole("link", { name: "Watch Demo" }).click();
  await expect(page).toHaveURL(/\/projects\/concept-science-academy#demo-video$/);
  const video = page.locator("#demo-video video");
  await expect(video).toBeVisible();
  await expect(video).toHaveAttribute("poster", "/images/projects/academy-demo-clear-voice-poster.webp");
  await expect(video).toHaveAttribute("preload", "metadata");
  await expect(video).toHaveAttribute("playsinline", "");
  await expect(video.locator("source")).toHaveAttribute("src", "/videos/academy-demo-clear-voice.mp4");
  await expect.poll(() => video.evaluate((element) => (element as HTMLVideoElement).duration)).toBeGreaterThan(75);
  expect(await video.evaluate((element) => (element as HTMLVideoElement).duration)).toBeLessThan(77);
  expect(await video.evaluate((element) => (element as HTMLVideoElement).paused)).toBe(true);
  expect(await video.evaluate((element) => (element as HTMLVideoElement).autoplay)).toBe(false);
  expect(await video.evaluate((element) => (element as HTMLVideoElement).controls)).toBe(true);
  const videoBox = await video.boundingBox();
  expect(videoBox!.width / videoBox!.height).toBeCloseTo(16 / 9, 1);
  await expect(page.locator(".case-visual .project-image")).toHaveAttribute(
    "alt",
    "Concept Science Academy logo used as the project cover",
  );
  const screenshots = page.locator(".screenshots img");
  await expect(screenshots).toHaveCount(4);
  for (const screenshot of await screenshots.all()) {
    await screenshot.scrollIntoViewIfNeeded();
    await expect.poll(() => screenshot.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
});

test("mobile app marketing project updates the existing team project", async ({
  page,
}, testInfo) => {
  await page.goto("/projects");
  await expect(page.getByText("Mobile App Lead Platform")).toHaveCount(0);
  const card = page.getByRole("link", {
    name: "View details for MetaViz Mobile App Landing Website",
  });
  await expect(card).toHaveCount(1);
  await expect(card).toContainText(
    "A landing site for native Brilliant Directories apps",
  );
  await card.click();
  await expect(page).toHaveURL(
    /\/projects\/mobile-app-marketing-lead-capture$/,
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "MetaViz Mobile App Landing Website",
  );
  await expect(
    page.getByText("Frontend Development · Team Project"),
  ).toBeVisible();
  await expect(
    page.getByText("Implemented · some updates on a feature branch"),
  ).toBeVisible();
  for (const heading of [
    "My role",
    "Main contributions",
    "Technical highlights",
    "Existing site integrations",
    "Outcome",
    "Screenshots",
  ]) {
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }
  await expect(
    page.getByText(
      "Some recent content and store-screenshot additions remain on a feature branch",
      { exact: false },
    ),
  ).toBeVisible();
  await expect(page.locator(".case-attribution")).toContainText(
    "built by teammates",
  );
  await expect(page.locator(".screenshots img")).toHaveCount(3);
  await expect(
    page.locator('.project-links a[href="https://app.metaviz.io/"]'),
  ).toHaveCount(1);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("mobile-app-marketing.png"),
    fullPage: true,
    animations: "disabled",
  });
  await page.goto("/projects/metaviz-landing");
  await expect(page).toHaveURL(
    /\/projects\/mobile-app-marketing-lead-capture$/,
  );
});

test("project archive keeps cards short and links to full details", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".workcard")).toHaveCount(0);
  await expect(page.locator(".feature").first().getByRole("link", { name: "Watch Demo" })).toHaveAttribute(
    "href",
    "/projects/ai-receptionist#demo-video",
  );
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
  }
  await navigation.getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.locator(".case-study-grid .workcard")).toHaveCount(7);
  if (testInfo.project.name === "desktop") {
    await expect(
      page.locator(".case-study-grid .workcard").first(),
    ).toBeInViewport();
  }
  await page.locator(".case-study-grid").screenshot({
    path: testInfo.outputPath("case-studies-grid.png"),
    style: ".site-header, .skip-link { visibility: hidden !important; }",
  });
  const image = page.locator(".case-study-grid img").first();
  await expect(image).toBeVisible();
  expect(
    await image.evaluate((el) => (el as HTMLImageElement).naturalWidth),
  ).toBeGreaterThan(0);
  await expect(image).toHaveAttribute("alt", /Frame from the Nova Digital AI Receptionist demo/);
  const previewBox = await page.locator(".case-study-grid .preview").first().boundingBox();
  expect(previewBox!.width / previewBox!.height).toBeCloseTo(16 / 9, 1);
  expect(await image.evaluate((element) => getComputedStyle(element).objectFit)).toBe("contain");
  const watchDemo = page.locator(".case-study-grid .workcard").first().getByRole("link", { name: "Watch Demo" });
  await expect(watchDemo).toHaveAttribute("href", "/projects/ai-receptionist#demo-video");
  await watchDemo.click();
  await expect(page).toHaveURL(/\/projects\/ai-receptionist#demo-video$/);
  for (const heading of ["Watch the demo", "The project", "What it does", "Current scope"]) {
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }
  const video = page.getByLabel("AI Receptionist demo video");
  await expect(video).toBeVisible();
  await expect(video).toHaveAttribute("poster", "/images/projects/ai-receptionist-demo-poster-4.webp");
  await expect(video).toHaveAttribute("preload", "metadata");
  await expect(video).toHaveAttribute("playsinline", "");
  await expect(video.locator("source")).toHaveAttribute("src", "/videos/nova-ai-receptionist-final-4.mp4");
  await expect.poll(() => video.evaluate((element) => (element as HTMLVideoElement).duration)).toBeGreaterThan(74);
  expect(await video.evaluate((element) => (element as HTMLVideoElement).duration)).toBeLessThan(76);
  const videoBox = await video.boundingBox();
  expect(videoBox!.width / videoBox!.height).toBeCloseTo(16 / 9, 1);
  expect(await video.evaluate((element) => (element as HTMLVideoElement).paused)).toBe(true);
  expect(await video.evaluate((element) => (element as HTMLVideoElement).autoplay)).toBe(false);
  expect(await video.evaluate((element) => (element as HTMLVideoElement).controls)).toBe(true);
  await expect(
    page.getByText("Full-Stack Development & Automation"),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Watch Demo" })).toHaveAttribute("href", "/projects/ai-receptionist#demo-video");
  await expect(page.getByText("does not handle phone calls")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Screenshots" }),
  ).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath("receptionist.png"),
    fullPage: true,
  });
});
