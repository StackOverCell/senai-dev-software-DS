using Microsoft.AspNetCore.Mvc;
using MinhaApi.Models;
using MinhaApi.Services;

namespace MinhaApi.Controllers; // ✅ Adicionei o namespace para ficar padrão

[ApiController]
[Route("api/[controller]")]
public class ProdutoController : ControllerBase
{
    private readonly IProdutoService _service;

    public ProdutoController(IProdutoService service)
        => _service = service;

    // GET /api/produto
    [HttpGet]
    public IActionResult GetAll()
    {
        var produtos = _service.GetAll();
        return Ok(produtos);
    }

    // GET /api/produto/1
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var produto = _service.GetById(id);
        if (produto == null)
            return NotFound();
        return Ok(produto);
    }

    // POST /api/produto
    [HttpPost]
    public IActionResult Create([FromBody] Produto produto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var criado = _service.Create(produto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = criado.Id },
            criado);
    }

    // PUT /api/produto/1
    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Produto produto)
    {
        var atualizado = _service.Update(id, produto);

        if (atualizado == null)
            return NotFound();

        return Ok(atualizado);
    }

    // DELETE /api/produto/1
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var deletado = _service.Delete(id);

        if (!deletado)
            return NotFound();

        return NoContent();
    }    

    // POST /api/produto/{id}/foto
    [HttpPost("{id}/foto")]
    public async Task<IActionResult> UploadFoto(int id, IFormFile arquivo)
    {
        // 1. Validação básica: veio arquivo?
        if (arquivo == null || arquivo.Length == 0)
            return BadRequest(new { message = "Nenhum arquivo enviado." });

        try
        {
            // 2. Chama o service (que valida tamanho, extensão, salva no disco e atualiza o banco)
            var nomeArquivo = await _service.SalvarFoto(id, arquivo);
            
            // 3. Retorna o nome do arquivo para o frontend montar a URL
            return Ok(new { foto = nomeArquivo });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message }); // Ex: "Arquivo muito grande"
        }
    }

    // DELETE /api/produto/{id}/foto
    [HttpDelete("{id}/foto")]
    public IActionResult RemoverFoto(int id)
    {
        try
        {
            // Chama o service (que apaga do disco e coloca NULL no banco)
            _service.RemoverFoto(id);
            
            // 204 No Content: Sucesso, mas não precisa retornar nenhum dado no corpo
            return NoContent(); 
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}