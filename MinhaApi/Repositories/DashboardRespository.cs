using MySqlConnector;
using Microsoft.Extensions.Configuration;
using MinhaApi.Models;

namespace MinhaApi.Repositories;

public class DashboardRepository : IDashboardRepository
{
    private readonly string _cs;

    public DashboardRepository(IConfiguration config)
        => _cs = config.GetConnectionString("DefaultConnection")!;

    public DashboardResumo ObterResumo(DateTime inicio)
    {
        using var conn = new MySqlConnection(_cs);
        conn.Open();

        var sql = @"
            SELECT 
                (SELECT COUNT(*) FROM vendas WHERE data_venda >= @Inicio) AS total_vendas,
                (SELECT COALESCE(SUM(valor), 0) FROM vendas WHERE data_venda >= @Inicio) AS faturamento,
                (SELECT COUNT(DISTINCT id_cliente) FROM vendas WHERE data_venda >= @Inicio) AS total_clientes";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Inicio", inicio);

        using var reader = cmd.ExecuteReader();
        var resumo = new DashboardResumo();
        
        if (reader.Read())
        {
            resumo.TotalVendas = reader.GetInt32("total_vendas");
            resumo.Faturamento = reader.GetDecimal("faturamento");
            resumo.TotalClientes = reader.GetInt32("total_clientes");
            
            resumo.TicketMedio = resumo.TotalVendas > 0 
                ? resumo.Faturamento / resumo.TotalVendas 
                : 0;
        }
        
        return resumo;
    }

    public List<VendasPorDia> ObterVendasPorDia(DateTime inicio)
    {
        using var conn = new MySqlConnection(_cs);
        conn.Open();

        var sql = @"
            SELECT 
                DATE(data_venda) AS data,
                COUNT(*) AS quantidade,
                SUM(valor) AS total
            FROM vendas
            WHERE data_venda >= @Inicio
            GROUP BY DATE(data_venda)
            ORDER BY data";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Inicio", inicio);

        using var reader = cmd.ExecuteReader();
        var lista = new List<VendasPorDia>();

        while (reader.Read())
        {
            lista.Add(new VendasPorDia
            {
                Data = reader.GetDateTime("data"),
                Quantidade = reader.GetInt32("quantidade"),
                Total = reader.GetDecimal("total")
            });
        }

        return lista;
    }

    public List<TopProduto> ObterTopProdutos(DateTime inicio, int limite)
    {
        using var conn = new MySqlConnection(_cs);
        conn.Open();

        var sql = @"
            SELECT 
                p.id AS ProdutoId,
                p.nome AS Nome,
                SUM(v.quantidade) AS QuantidadeVendida,
                SUM(v.valor) AS Faturamento
            FROM vendas v
            JOIN produtos p ON v.id_produto = p.id
            WHERE v.data_venda >= @Inicio
            GROUP BY p.id, p.nome
            ORDER BY QuantidadeVendida DESC
            LIMIT @Limite";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Inicio", inicio);
        cmd.Parameters.AddWithValue("@Limite", limite);

        using var reader = cmd.ExecuteReader();
        var lista = new List<TopProduto>();

        while (reader.Read())
        {
            lista.Add(new TopProduto
            {
                ProdutoId = reader.GetInt32("ProdutoId"),
                Nome = reader.GetString("Nome"),
                QuantidadeVendida = reader.GetInt32("QuantidadeVendida"),
                Faturamento = reader.GetDecimal("Faturamento")
            });
        }

        return lista;
    }

    public List<UltimaVenda> ObterUltimasVendas(int limite)
    {
        using var conn = new MySqlConnection(_cs);
        conn.Open();

        var sql = @"
            SELECT 
                v.id AS Id,
                c.nome AS Cliente,
                p.nome AS Produto,
                v.quantidade AS Quantidade,
                v.valor AS ValorTotal,
                v.data_venda AS DataVenda
            FROM vendas v
            JOIN cliente c ON v.id_cliente = c.id
            JOIN produtos p ON v.id_produto = p.id
            ORDER BY v.data_venda DESC
            LIMIT @Limite";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Limite", limite);

        using var reader = cmd.ExecuteReader();
        var lista = new List<UltimaVenda>();

        while (reader.Read())
        {
            lista.Add(new UltimaVenda
            {
                Id = reader.GetInt32("Id"),
                Cliente = reader.GetString("Cliente"),
                Produto = reader.GetString("Produto"),
                Quantidade = reader.GetInt32("Quantidade"),
                ValorTotal = reader.GetDecimal("ValorTotal"),
                DataVenda = reader.GetDateTime("DataVenda")
            });
        }

        return lista;
    }

    public List<ProdutoEstoqueBaixo> ObterEstoqueBaixo(int minimo)
    {
        using var conn = new MySqlConnection(_cs);
        conn.Open();

        var sql = @"
            SELECT id AS Id, nome AS Nome, estoque AS Estoque
            FROM produtos
            WHERE estoque <= @Minimo
            ORDER BY estoque ASC";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Minimo", minimo);

        using var reader = cmd.ExecuteReader();
        var lista = new List<ProdutoEstoqueBaixo>();

        while (reader.Read())
        {
            lista.Add(new ProdutoEstoqueBaixo
            {
                Id = reader.GetInt32("Id"),
                Nome = reader.GetString("Nome"),
                Estoque = reader.GetInt32("Estoque")
            });
        }

        return lista;
    }
}