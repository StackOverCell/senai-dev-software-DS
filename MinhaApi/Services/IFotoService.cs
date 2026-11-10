namespace MinhaApi.Services;

public interface IFotoService
{
    Task<string> SalvarAsync(IFormFile arquivo);
    void Deletar(string nomeArquivo);
}