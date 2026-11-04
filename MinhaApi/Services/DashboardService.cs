using MinhaApi.Models;
using MinhaApi.Repositories;

namespace MinhaApi.Services;

public class DashboardService : IDashboardService
{
    private readonly IDashboardRepository _repo;

    public DashboardService(IDashboardRepository repo)
        => _repo = repo;

    // Regra 1: Valida e converte "dias" em data inicial
    private static DateTime CalcularInicio(int dias)
    {
        if (dias < 1 || dias > 90)
            throw new ArgumentException("O período deve ser entre 1 e 90 dias.");
        
        return DateTime.Today.AddDays(-(dias - 1)); // inclui hoje
    }

    private static void ValidarLimite(int limite)
    {
        if (limite < 1 || limite > 20)
            throw new ArgumentException("O limite deve ser entre 1 e 20.");
    }

    public DashboardResumo ObterResumo(int dias)
    {
        var inicio = CalcularInicio(dias);
        var resumo = _repo.ObterResumo(inicio);
        
        // Regra 2: Ticket médio sem divisão por zero
        if (resumo.TotalVendas > 0)
            resumo.TicketMedio = resumo.Faturamento / resumo.TotalVendas;
        else
            resumo.TicketMedio = 0;
        
        return resumo;
    }

    public List<VendasPorDia> ObterVendasPorDia(int dias)
    {
        var inicio = CalcularInicio(dias);
        var vendas = _repo.ObterVendasPorDia(inicio);
        
        // Regra 3: Preencher dias sem venda (para o gráfico não pular)
        var resultado = new List<VendasPorDia>();
        
        for (var data = inicio.Date; data <= DateTime.Today; data = data.AddDays(1))
        {
            var vendaDoDia = vendas.FirstOrDefault(v => v.Data.Date == data);
            
            if (vendaDoDia != null)
            {
                resultado.Add(vendaDoDia);
            }
            else
            {
                // Dia sem venda: adiciona com zero
                resultado.Add(new VendasPorDia
                {
                    Data = data,
                    Quantidade = 0,
                    Total = 0
                });
            }
        }
        
        return resultado;
    }

    public List<TopProduto> ObterTopProdutos(int dias, int limite)
    {
        ValidarLimite(limite);
        var inicio = CalcularInicio(dias);
        return _repo.ObterTopProdutos(inicio, limite);
    }

    public List<UltimaVenda> ObterUltimasVendas(int limite)
    {
        ValidarLimite(limite);
        return _repo.ObterUltimasVendas(limite);
    }

    public List<ProdutoEstoqueBaixo> ObterEstoqueBaixo(int minimo)
    {
        if (minimo < 0)
            throw new ArgumentException("O mínimo não pode ser negativo.");
        
        return _repo.ObterEstoqueBaixo(minimo);
    }
}