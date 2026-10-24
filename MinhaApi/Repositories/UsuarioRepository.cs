using MySqlConnector;
using MinhaApi.Models;
using Microsoft.Extensions.Configuration;

namespace MinhaApi.Repositories;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly string _cs;

    public UsuarioRepository(IConfiguration config)
        => _cs = config.GetConnectionString("DefaultConnection")!;

    public Usuario? BuscarPorEmail(string email)
    {
        using var conn = new MySqlConnection(_cs);
        conn.Open();

        string sql = "SELECT * FROM usuarios WHERE email = @Email AND ativo = 1";
        using var cmd = new MySqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@Email", email);

        using var reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return new Usuario
            {
                Id = reader.GetInt32("id"),
                Nome = reader.GetString("nome"),
                Email = reader.GetString("email"),
                SenhaHash = reader.GetString("senha_hash"),
                Ativo = reader.GetBoolean("ativo")
            };
        }

        return null;
    }
}