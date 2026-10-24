using MinhaApi.Models;
namespace MinhaApi.Services;
public interface IAuthService
{
    LoginResponse Login(LoginRequest req);
}