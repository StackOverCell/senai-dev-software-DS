using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using MinhaApi.Models;
using MinhaApi.Repositories;

namespace MinhaApi.Services;

public class AuthService : IAuthService
{
    private readonly IUsuarioRepository _repo;
    private readonly IConfiguration _config;

    public AuthService(IUsuarioRepository repo, IConfiguration config)
    {
        _repo = repo;
        _config = config;
    }

    public LoginResponse Login(LoginRequest req)
    {
        // 1. Busca o usuário pelo e-mail
        var usuario = _repo.BuscarPorEmail(req.Email);

        // 2. Verifica se existe E se a senha bate com o hash
        if (usuario == null || !BCrypt.Net.BCrypt.Verify(req.Senha, usuario.SenhaHash))
        {
            // Mensagem genérica por segurança (não revela se o e-mail existe ou não)
            throw new UnauthorizedAccessException("Credenciais inválidas.");
        }

        // 3. Gera o token JWT
        var token = GerarToken(usuario);

        // 4. Retorna os dados (sem a senha!)
        return new LoginResponse
        {
            Token = token,
            Nome = usuario.Nome,
            Email = usuario.Email
        };
    }

    private string GerarToken(Usuario usuario)
    {
        var jwtKey = _config["Jwt:Key"]!;
        var issuer = _config["Jwt:Issuer"]!;
        var audience = _config["Jwt:Audience"]!;
        var expiresMinutes = int.Parse(_config["Jwt:ExpiresInMinutes"]!);

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
            new Claim(ClaimTypes.Name, usuario.Nome),
            new Claim(ClaimTypes.Email, usuario.Email)
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiresMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}