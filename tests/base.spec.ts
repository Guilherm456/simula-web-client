import { expect, test } from "@playwright/test";

test.describe("Fluxo de criação de base", () => {
  test("deve criar uma nova base manualmente com sucesso", async ({ page }) => {
    // Navegar para a página inicial
    await page.goto("/");

    // Abrir o modal de criação de base
    await page.click("#create-new-base-button");

    // Verificar se o modal está visível
    await expect(page.locator("text=Criar nova base")).toBeVisible();

    // Preencher o formulário com informações básicas
    await page.fill("#name-base-input", "Base de Teste");

    await page.click("#structure-base-autocomplete");

    await page.getByRole("option").first().click();

    // Supondo que o formulário requeira a seleção manual sem o uso de arquivos
    await page.click("#create-base-manually-button");

    // Esperar pela notificação de sucesso
    await expect(page.locator("text=Base criada com sucesso!")).toBeVisible();

    // Verificar a navegação para a página da nova base
    await expect(page).toHaveURL(/\/base\/[0-9a-fA-F]{24}/); // Supondo que o ID da base é um ObjectId do MongoDB
  });
});
