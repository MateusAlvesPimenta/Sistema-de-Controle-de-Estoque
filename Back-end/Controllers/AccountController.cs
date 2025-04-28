using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Back_end.AuthenticationModels;
using Back_end.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Back_end.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAuthenticate _authenticate;
        private readonly IConfiguration _config;

        public AccountController(IAuthenticate authenticate, IConfiguration config)
        {
            _authenticate = authenticate;
            _config = config;
        }

        [HttpPost("AuthenticateUser")]
        public async Task<IActionResult> AuthenticateUser([FromBody] LoginModel loginModel)
        {
            var response = await _authenticate.AuthenticateUser(loginModel.Email, loginModel.Password);

            if (!response)
            {
                return BadRequest("Invalid login credentials");
            }
            var token = GenerateToken(loginModel.Email);

            return Ok(token);
        }

        [HttpPost("RegisterUser")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterModel registerModel)
        {
            if (registerModel.Password != registerModel.ConfirmPassword)
            {
                return BadRequest("Divergent passwords");
            }
            else if (registerModel.Password.Length < 8)
            {
                return BadRequest("The password is too short");
            }
            var response = await _authenticate.RegisterUser(registerModel.Email, registerModel.Password);

            if (!response)
            {
                return BadRequest("Invalid register");
            }
            return Ok($"User {registerModel.Email} created successfully");
        }

        private UserToken GenerateToken(string email)
        {
            var jwtConfig = _config.GetSection("JwtConfig");
            var key = Encoding.ASCII.GetBytes(jwtConfig["Key"]);
            var credentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256
            );
            var claims = new[]{
                new Claim("email", email),
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var token = new JwtSecurityToken(
                issuer: jwtConfig["Issuer"],
                audience: jwtConfig["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(8),
                signingCredentials: credentials
            );

            return new UserToken(
                token: new JwtSecurityTokenHandler().WriteToken(token),
                email: email,
                expiration: DateTime.UtcNow
            );
        }
    }
}