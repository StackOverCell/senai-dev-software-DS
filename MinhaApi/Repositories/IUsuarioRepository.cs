using MinhaApi.Models;

namespace MinhaApi.Repositories;

public interface IUsuarioRepository
{
    // Retorna null se não encontrar
    Usuario? BuscarPorEmail(string email);
}