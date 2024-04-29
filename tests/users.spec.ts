import { expect, test } from "@playwright/test";

test.describe("Cadastro de Usuário", () => {
  test("Criar novo usuário através do modal", async ({ page }) => {
    // Navegar para a página onde o botão de cadastro está disponível
    await page.goto("/usuarios");

    // Abrir o modal de cadastro de usuário
    await page.click("#button-new-user");

    // Verificar se o modal está aberto e o título está visível
    await expect(page.locator("text=Cadastrar novo usuário")).toBeVisible();

    // Preencher o formulário com as informações do usuário
    await page.fill("#name-input", "Nome do Usuário");
    await page.fill("#email-input", "usuario@example.com");
    await page.fill("#password-input", "senha123");
    await page.fill("#confirm-password-input", "senha123");

    // Selecionar o tipo de usuário
    await page.click("#user-type-select");
    await page.click("#select-option-admin"); // Supõe que está selecionando a opção "Administrador"

    // Submeter o formulário
    await page.click("#button-create-user");

    // Verificar se o usuário foi criado com sucesso (dependendo de como a notificação é implementada)
    await expect(page.locator("text=Usuário criado com sucesso")).toBeVisible();
  });
});
