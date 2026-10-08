using MinhaApi.Models;
using MySqlConnector;

namespace MinhaApi.Repositories;

public class VendaRepository : IVendaRepository
{
    private readonly string _connectionString;

    public VendaRepository(IConfiguration config) => _connectionString = config.GetConnectionString("DefaultConnection")!;

    public void Add(Venda venda)
    {
        using var connection = new MySqlConnection(_connectionString);
        connection.Open();

        string sql = @"
            INSERT INTO Vendas
            (id_cliente, id_produto, data_venda, quantidade, valor)
            VALUES
            (@id_cliente, @id_produto, @data_venda, @quantidade, @valor);
        ";

        using var command = new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue("@id_cliente", venda.ClienteId);
        command.Parameters.AddWithValue("@id_produto", venda.ProdutoId);
        command.Parameters.AddWithValue("@data_venda", venda.DataVenda);
        command.Parameters.AddWithValue("@quantidade", venda.Quantidade);
        command.Parameters.AddWithValue("@valor", venda.ValorTotal);

        command.ExecuteNonQuery();

        venda.Id = Convert.ToInt32(command.LastInsertedId);
    }

    public Venda? GetById(int id)
    {
        using var connection = new MySqlConnection(_connectionString);
        connection.Open();

        string sql = @"
            SELECT
                id,
                id_cliente,
                id_produto,
                data_venda,
                quantidade,
                valor
            FROM Vendas
            WHERE id = @id;
        ";

        using var command = new MySqlCommand(sql, connection);

        command.Parameters.AddWithValue("@id", id);

        using var reader = command.ExecuteReader();

        if (!reader.Read())
            return null;

        return new Venda
        {
            Id = reader.GetInt32("id"),
            ClienteId = reader.GetInt32("id_cliente"),
            ProdutoId = reader.GetInt32("id_produto"),
            DataVenda = reader.GetDateTime("data_venda"),
            Quantidade = reader.GetInt32("quantidade"),
            ValorTotal = reader.GetDecimal("valor")
        };
    }

    public IEnumerable<Venda> GetAll()
    {
        var vendas = new List<Venda>();

        using var connection = new MySqlConnection(_connectionString);
        connection.Open();

        string sql = @"
            SELECT
                id,
                id_cliente,
                id_produto,
                data_venda,
                quantidade,
                valor
            FROM Vendas;
        ";

        using var command = new MySqlCommand(sql, connection);
        using var reader = command.ExecuteReader();

        while (reader.Read())
        {
            var venda = new Venda
            {
                Id = reader.GetInt32("id"),
                ClienteId = reader.GetInt32("id_cliente"),
                ProdutoId = reader.GetInt32("id_produto"),
                DataVenda = reader.GetDateTime("data_venda"),
                Quantidade = reader.GetInt32("quantidade"),
                ValorTotal = reader.GetDecimal("valor")
            };

            vendas.Add(venda);
        }

        return vendas;
    }
}