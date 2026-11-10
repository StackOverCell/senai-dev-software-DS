namespace MinhaApi.Services;

public class FotoService : IFotoService
{
    private readonly string _pasta;
    
    // Extensões permitidas
    private static readonly string[] _extensoes = 
        { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
    
    // Tamanho máximo: 5MB
    private const long _tamanhoMax = 5 * 1024 * 1024;

    public FotoService(IWebHostEnvironment env)
    {
        // Define o caminho da pasta de uploads
        var raiz = env.WebRootPath 
            ?? Path.Combine(env.ContentRootPath, "wwwroot");
        _pasta = Path.Combine(raiz, "uploads", "produtos");
        
        // Cria a pasta se não existir
        Directory.CreateDirectory(_pasta);
    }

    public async Task<string> SalvarAsync(IFormFile arquivo)
    {
        // Valida a extensão do arquivo
        var ext = Path.GetExtension(arquivo.FileName).ToLower();
        if (!_extensoes.Contains(ext))
            throw new ArgumentException(
                "Formato inválido. Use JPG, PNG, GIF ou WEBP.");

        // Valida o tamanho do arquivo
        if (arquivo.Length > _tamanhoMax)
            throw new ArgumentException(
                "Arquivo muito grande. Máximo: 5 MB.");

        // Gera um nome único para o arquivo (ex: a3f9b2c1-d7e1.jpg)
        var nomeArquivo = $"{Guid.NewGuid()}{ext}";
        var caminho = Path.Combine(_pasta, nomeArquivo);

        // Salva o arquivo no disco
        using var stream = new FileStream(caminho, FileMode.Create);
        await arquivo.CopyToAsync(stream);

        // Retorna apenas o nome do arquivo (não o caminho completo)
        return nomeArquivo;
    }

    public void Deletar(string nomeArquivo)
    {
        var caminho = Path.Combine(_pasta, nomeArquivo);
        
        // Só deleta se o arquivo existir
        if (File.Exists(caminho))
        {
            File.Delete(caminho);
        }
    }
}