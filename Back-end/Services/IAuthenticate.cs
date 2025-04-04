namespace Back_end.Services
{
    public interface IAuthenticate
    {
        Task<bool> AuthenticateUser(string email, string password);
        Task<bool> RegisterUser(string email, string password);
    }
}