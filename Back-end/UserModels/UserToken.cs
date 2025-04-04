namespace Back_end.AuthenticationModels
{
    public class UserToken
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }

        public UserToken() { }
        public UserToken(string token, DateTime expiration)
        {
            Token = token;
            Expiration = expiration;
        }
    }
}