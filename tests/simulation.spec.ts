import { expect, test } from "@playwright/test";

test.describe("Fluxo de criação de simulação", () => {
  let simulationId = "";
  test("deve criar uma nova simulação com sucesso", async ({ page }) => {
    // Navegar para a página de simulações
    await page.goto("/simulacoes");

    // Abrir o modal de criação de simulação
    await page.click("#button-create-simulation");

    // Verificar se o modal está aberto verificando a visibilidade do título
    expect(page.locator("#title-simulation-modal")).toBeVisible();

    // Preencher o campo nome da simulação
    await page.fill("#name-textfield", "Nova Simulação Teste");

    // Selecionar a primeira base disponível no autocomplete
    // Clicar no campo de autocomplete para abrir as opções
    await page.click("#base-autocomplete");
    // Esperar que as opções sejam carregadas e selecionar a primeira base
    await page.getByRole("option").first().click();

    // Submeter o formulário
    await page.click("#create-simulation-button");

    // Verificar se a simulação foi criada com sucesso (depende de como sua aplicação responde ao sucesso)
    await expect(
      page.locator("text=Simulação criada com sucesso"),
    ).toBeVisible();

    // Verificar se a URL foi atualizada para a página da nova simulação
    await expect(page).toHaveURL(/\/simulacoes\/[a-zA-Z0-9]+/);

    // Extrair o ID da simulação da URL
    simulationId = page.url().split("/").pop() as string;
  });

  test("deve executar a simulação com sucesso", async ({ page }) => {
    // Navegar para a página da simulação
    await page.goto(`/simulacoes/${simulationId}`);

    // Clique no botão para executar a simulação
    await page.click("#execute-simulation-button");

    // Verificar a notificação de sucesso
    await expect(
      page.locator("text=Simulação executada com sucesso"),
    ).toBeVisible();

    // Verificar se a URL foi atualizada para refletir o estado de execução
    await expect(page).toHaveURL("/simulacoes?status=RUNNING");
  });

  test("Excluir simulação", async ({ page }) => {
    await page.goto(`/simulacoes/${simulationId}`);
    // Clique no botão de deletar simulação
    await page.click("#button-delete");

    // Confirmar a exclusão na caixa de diálogo
    await page.click("text=Confirmar");

    // Verificar a notificação de exclusão bem-sucedida
    await expect(
      page.locator("text=Simulação excluída com sucesso"),
    ).toBeVisible();

    // Verificar se a página foi redirecionada para a lista de simulações
    await expect(page).toHaveURL("/simulacoes");
  });
});
