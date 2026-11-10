using MinhaApi.Models;
using MinhaApi.Repositories;
using MySqlConnector;

public class ProdutoRepository : IProdutoRepository
{
    private readonly string _connectionString;

    public ProdutoRepository(IConfiguration config) 
        => _connectionString = config.GetConnectionString("DefaultConnection")!;

    public IEnumerable<Produto> GetAll() 
    {
        var lista = new List<Produto>();
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        // ✅ ALTERADO: Adicionado 'foto' no SELECT
        string sql = "SELECT id, nome, preco, estoque, ativo, foto FROM produtos";
        using var cmd = new MySqlCommand(sql, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read()) 
        {
            lista.Add(new Produto 
            {
                Id = reader.GetInt32("id"),
                Nome = reader.GetString("nome"),
                Preco = reader.GetDecimal("preco"),
                Estoque = reader.GetInt32("estoque"),
                Ativo = reader.GetBoolean("ativo"),
                // ✅ NOVO: Trata NULL do banco para não dar erro
                Foto = reader["foto"] == DBNull.Value ? null : reader.GetString("foto")
            });
        }
        return lista;
    }
    
    public Produto? GetById(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        // ✅ ALTERADO: Adicionado 'foto' no SELECT
        string sql = "SELECT id, nome, preco, estoque, ativo, foto FROM produtos WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);
        using var reader = cmd.ExecuteReader();

        if (!reader.Read())
            return null;

        return new Produto
        {
            Id = reader.GetInt32("id"),
            Nome = reader.GetString("nome"),
            Preco = reader.GetDecimal("preco"),
            Estoque = reader.GetInt32("estoque"),
            Ativo = reader.GetBoolean("ativo"),
            // ✅ NOVO: Trata NULL do banco
            Foto = reader["foto"] == DBNull.Value ? null : reader.GetString("foto")
        };
    }

    public void Add(Produto p) 
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = @"INSERT INTO produtos (nome, preco, estoque, ativo) 
                    VALUES (@Nome, @Preco, @Estoque, @Ativo);
                    SELECT LAST_INSERT_ID();";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Nome", p.Nome);
        cmd.Parameters.AddWithValue("@Preco", p.Preco);
        cmd.Parameters.AddWithValue("@Estoque", p.Estoque);
        cmd.Parameters.AddWithValue("@Ativo", p.Ativo);

        var idGerado = cmd.ExecuteScalar();
        p.Id = Convert.ToInt32(idGerado);
    }

    public void Update(Produto p)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();
        string sql = @"UPDATE produtos
                     SET nome = @Nome, preco = @Preco, estoque = @Estoque, ativo = @Ativo WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", p.Id);
        cmd.Parameters.AddWithValue("@Nome", p.Nome);
        cmd.Parameters.AddWithValue("@Preco", p.Preco);
        cmd.Parameters.AddWithValue("@Estoque", p.Estoque);
        cmd.Parameters.AddWithValue("@Ativo", p.Ativo);
        cmd.ExecuteNonQuery();
    }

    public void Delete(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();
        string sql = "DELETE FROM produtos WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);
        cmd.ExecuteNonQuery();
    }

    public void AtualizarEstoque(int id, int quantidade)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = @"UPDATE produtos 
                        SET estoque = estoque - @Quantidade 
                        WHERE id = @Id AND estoque >= @Quantidade";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Quantidade", quantidade);
        cmd.Parameters.AddWithValue("@Id", id);

        cmd.ExecuteNonQuery();
    }

    // ✅ NOVO: Método para atualizar apenas a foto
    public void AtualizarFoto(int id, string? nomeArquivo)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();
        
        string sql = "UPDATE produtos SET foto = @Foto WHERE id = @Id";
        using var cmd = new MySqlCommand(sql, conn);
        
        // Truque importante: se nomeArquivo for null, enviamos DBNull.Value para o MySQL
        cmd.Parameters.AddWithValue("@Foto", (object?)nomeArquivo ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@Id", id);
        
        cmd.ExecuteNonQuery();
    }
}