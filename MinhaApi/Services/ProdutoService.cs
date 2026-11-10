using MinhaApi.Models;
using MinhaApi.Repositories;
using MinhaApi.Services;

public class ProdutoService : IProdutoService
{
    private readonly IProdutoRepository _repo;
    private readonly IFotoService _fotoService; // ✅ NOVO: Injetado pelo DI

    // ✅ ALTERADO: Construtor agora recebe o IFotoService também
    public ProdutoService(IProdutoRepository repo, IFotoService fotoService)
    {
        _repo = repo;
        _fotoService = fotoService;
    }

    public IEnumerable<Produto> GetAll()
        => _repo.GetAll();

    public Produto? GetById(int id)
        => _repo.GetById(id);

    public Produto Create(Produto produto)
    {
        if (produto.Preco < 0)
            throw new ArgumentException("Preço inválido");
        _repo.Add(produto);
        return produto;
    }

    public Produto? Update(int id, Produto p)
    {
        if (_repo.GetById(id) == null) return null;
        p.Id = id;
        _repo.Update(p);
        return p;
    }

    public bool Delete(int id)
    {
        if (_repo.GetById(id) == null) return false;
        _repo.Delete(id);
        return true;
    }

    // ✅ NOVO: Salvar foto do produto
    public async Task<string> SalvarFoto(int id, IFormFile arquivo)
    {
        // 1. Verifica se o produto existe
        var produto = _repo.GetById(id)
            ?? throw new KeyNotFoundException("Produto não encontrado.");

        // 2. Se já tem foto, apaga a antiga do disco
        if (!string.IsNullOrEmpty(produto.Foto))
            _fotoService.Deletar(produto.Foto);

        // 3. Salva o novo arquivo (valida extensão e tamanho)
        var nomeArquivo = await _fotoService.SalvarAsync(arquivo);

        // 4. Atualiza a coluna no banco
        _repo.AtualizarFoto(id, nomeArquivo);

        return nomeArquivo;
    }

    // ✅ NOVO: Remover foto do produto
    public void RemoverFoto(int id)
    {
        var produto = _repo.GetById(id)
            ?? throw new KeyNotFoundException("Produto não encontrado.");

        // Se não tem foto, não faz nada
        if (string.IsNullOrEmpty(produto.Foto)) return;

        // Apaga do disco e limpa o banco
        _fotoService.Deletar(produto.Foto);
        _repo.AtualizarFoto(id, null);
    }
}