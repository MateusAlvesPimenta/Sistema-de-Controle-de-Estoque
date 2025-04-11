using System.ComponentModel.DataAnnotations;

namespace Back_end.AuthenticationModels
{
    public class UserToken
    {
        public string Token { get; set; }
        public string Email { get; set; }
        public DateTime Expiration { get; set; }

        public UserToken() { }
        public UserToken(string token, string email, DateTime expiration)
        {
            Token = token;
            Email = email;
            Expiration = expiration;
        }
    }
}