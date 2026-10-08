using Microsoft.AspNetCore.Mvc;
using MinhaApi.DTO;
using MinhaApi.Services;

namespace MinhaApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VendaController : ControllerBase
{
    private readonly IVendaService _service;

    public VendaController(IVendaService service)
    {
        _service = service;
    }

    [HttpPost]
    public IActionResult Create([FromBody] VendaRequest venda)
    {
        try
        {
            var realizada = _service.Create(venda);
            return Ok(realizada);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { erro = ex.Message });
        }
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_service.GetAll());
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var venda = _service.GetById(id);

        if (venda == null)
            return NotFound(new { erro = "Venda não encontrada." });

        return Ok(venda);
    }
}
