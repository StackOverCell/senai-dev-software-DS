namespace MinhaApi.Models;

public class Venda
{
    public int Id { get; set; }
    public int ClienteId { get; set; }
    public int ProdutoId { get; set; }
    public DateTime DataVenda { get; set; }
    public int Quantidade { get; set; }
    public decimal ValorUnitario { get; set; }
    public decimal ValorTotal { get; set; }
}