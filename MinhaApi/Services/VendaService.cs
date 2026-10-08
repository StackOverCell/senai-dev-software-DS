using MinhaApi.DTO;
using MinhaApi.Models;
using MinhaApi.Repositories;

namespace MinhaApi.Services;

public class VendaService : IVendaService
{
    private readonly IVendaRepository _repo;
    private readonly IProdutoRepository _repoProduto;
    private readonly IClienteRepository _repoCliente;

    public VendaService(
        IVendaRepository repo,
        IProdutoRepository repoProduto,
        IClienteRepository repoCliente)
    {
        _repo = repo;
        _repoProduto = repoProduto;
        _repoCliente = repoCliente;
    }

    public VendaResponse Create(VendaRequest dto)
    {
        if (dto.Quantidade <= 0)
            throw new ArgumentException("A quantidade deve ser maior que zero.");

        var produto = _repoProduto.GetById(dto.Id_Produto);
        var cliente = _repoCliente.GetById(dto.Id_Cliente);

        if (cliente == null)
            throw new ArgumentException("Cliente não encontrado com o ID informado.");

        if (produto == null)
            throw new ArgumentException("Produto não encontrado com o ID informado.");

        if (!produto.Ativo)
            throw new ArgumentException("O produto está inativo.");

        if (!cliente.Ativo)
            throw new ArgumentException("O cliente está inativo.");

        if (produto.Estoque < dto.Quantidade)
            throw new ArgumentException("Estoque insuficiente.");

        var venda = new Venda
        {
            ClienteId = dto.Id_Cliente,
            ProdutoId = dto.Id_Produto,
            Quantidade = dto.Quantidade,
            ValorUnitario = produto.Preco,
            ValorTotal = produto.Preco * dto.Quantidade,
            DataVenda = DateTime.Now
        };

        _repoProduto.AtualizarEstoque(produto.Id, venda.Quantidade);
        _repo.Add(venda);

        return MapearParaDTO(venda);
    }

    public IEnumerable<VendaResponse> GetAll()
        => _repo.GetAll().Select(MapearParaDTO);

    public VendaResponse? GetById(int id)
    {
        var venda = _repo.GetById(id);
        return venda == null ? null : MapearParaDTO(venda);
    }

    private VendaResponse MapearParaDTO(Venda venda)
    {
        var cliente = _repoCliente.GetById(venda.ClienteId);
        var produto = _repoProduto.GetById(venda.ProdutoId);

        return new VendaResponse
        {
            Id = venda.Id,
            NomeCliente = cliente?.Nome ?? "Cliente não encontrado",
            NomeProduto = produto?.Nome ?? "Produto não encontrado",
            Quantidade = venda.Quantidade,
            Valor_Unitario = venda.ValorUnitario != 0 ? venda.ValorUnitario : produto?.Preco ?? 0,
            Total_Venda = venda.ValorTotal,
            Data_Venda = venda.DataVenda
        };
    }
}
