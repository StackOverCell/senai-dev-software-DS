using Microsoft.Extensions.Configuration;
using MinhaApi.Models;
using MinhaApi.Repositories;
using MySqlConnector;

namespace MinhaApi.Repositories;

public class TipoRepository : ITipoRepository
{
    private readonly string _connectionString;

    public TipoRepository(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("DefaultConnection")!;
    }

    public IEnumerable<Tipo> GetAll()
    {
        var lista = new List<Tipo>();
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "SELECT id, nome FROM tipo";

        using var cmd = new MySqlCommand(sql, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            lista.Add(new Tipo
            {
                Id = reader.GetInt32("id"),
                Nome = reader.GetString("nome")
            });
        }

        return lista;
    }

    public Tipo? GetById(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "SELECT id, nome FROM tipo WHERE id = @Id";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);
        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return new Tipo
            {
                Id = reader.GetInt32("id"),
                Nome = reader.GetString("nome")
            };
        }

        return null;
    }

    public void Add(Tipo t)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = @"INSERT INTO tipo (nome) VALUES (@Nome);
                       SELECT LAST_INSERT_ID();";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Nome", t.Nome);

        var idGerado = cmd.ExecuteScalar();
        if (idGerado != null && idGerado != DBNull.Value)
        {
            t.Id = Convert.ToInt32(idGerado);
        }
    }

    public void Update(Tipo t)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "UPDATE tipo SET nome = @Nome WHERE id = @Id";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", t.Id);
        cmd.Parameters.AddWithValue("@Nome", t.Nome);

        cmd.ExecuteNonQuery();
    }

    public void Delete(int id)
    {
        using var conn = new MySqlConnection(_connectionString);
        conn.Open();

        string sql = "DELETE FROM tipo WHERE id = @Id";

        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);

        cmd.ExecuteNonQuery();
    }
}