using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MinhaApi.Services;

namespace MinhaApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _service;

    public DashboardController(IDashboardService service)
        => _service = service;

    // GET /api/dashboard/resumo?dias=30
    [HttpGet("resumo")]
    public IActionResult Resumo([FromQuery] int dias = 30)
    {
        try
        {
            return Ok(_service.ObterResumo(dias));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // GET /api/dashboard/vendas-por-dia?dias=30
    [HttpGet("vendas-por-dia")]
    public IActionResult VendasPorDia([FromQuery] int dias = 30)
    {
        try
        {
            return Ok(_service.ObterVendasPorDia(dias));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // GET /api/dashboard/top-produtos?dias=30&limite=5
    [HttpGet("top-produtos")]
    public IActionResult TopProdutos([FromQuery] int dias = 30, [FromQuery] int limite = 5)
    {
        try
        {
            return Ok(_service.ObterTopProdutos(dias, limite));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // GET /api/dashboard/ultimas-vendas?limite=5
    [HttpGet("ultimas-vendas")]
    public IActionResult UltimasVendas([FromQuery] int limite = 5)
    {
        try
        {
            return Ok(_service.ObterUltimasVendas(limite));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // GET /api/dashboard/estoque-baixo?minimo=5
    [HttpGet("estoque-baixo")]
    public IActionResult EstoqueBaixo([FromQuery] int minimo = 5)
    {
        try
        {
            return Ok(_service.ObterEstoqueBaixo(minimo));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}