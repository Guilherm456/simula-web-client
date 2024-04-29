import { chromium, FullConfig } from "@playwright/test";

export default async function globalSetup(config: FullConfig) {
  const { baseURL, storageState, headless } = config.projects[0].use;

  const browser = await chromium.launch({
    headless,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(`${baseURL}/login`);

  // Preencha os campos de e-mail e senha e submeta o formulário
  await page.fill("input#email-input", "admin");
  await page.fill("input#password-input", "admin");
  await page.click("button#login-button");

  await page.waitForURL(`${baseURL}/`);

  await page.context().storageState({ path: storageState as string });

  await browser.close();
}
