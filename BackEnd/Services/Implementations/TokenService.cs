using AutoMapper;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Common.Authentication;

namespace Services.Implementations
{
    public class TokenService : ITokenService
    {
        private JwtOptions jwtSettings;
        protected readonly IMapper mapper;

        public TokenService(IOptions<JwtOptions> jwtOptions,
            IMapper mapper)
        {
            this.jwtSettings = jwtOptions.Value;
            this.mapper = mapper;
        }

        public string GenerateJwtToken(List<Claim> claims, bool hasExpiration = true, double? expiresIn = null)
        {
            expiresIn = expiresIn.HasValue ? expiresIn.Value : Convert.ToDouble(this.jwtSettings.JwtExpiresIn);
            var now = DateTime.UtcNow;
            DateTime? expires = hasExpiration ? (DateTime?)DateTime.Now.AddSeconds(expiresIn.Value) : null;

            // Specifically add the jti (nonce), iat (issued timestamp), and sub (subject/user) claims.
            // You can add other claims here, if you want:
            claims.AddRange(new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Aud, this.jwtSettings.JwtIssuer),
                new Claim(JwtRegisteredClaimNames.Iss, this.jwtSettings.JwtIssuer),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, now.ToString(), ClaimValueTypes.Integer64)
            });

            var key = this.GetTokenKey();
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                this.jwtSettings.JwtIssuer,
                this.jwtSettings.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateRefreshJwtToken(List<Claim> claims)
        {
            var expiresIn = Convert.ToDouble(this.jwtSettings.JwtRefreshExpiresIn);

            return this.GenerateJwtToken(claims, true, expiresIn);
        }

        public void ValidateToken(string token, bool validateLifetime = true)
        {
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            SecurityToken validated;

            handler.ValidateToken(token, new TokenValidationParameters()
            {
                ValidateLifetime = validateLifetime,
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidIssuer = this.jwtSettings.JwtIssuer,
                ValidAudience = this.jwtSettings.JwtIssuer,
                IssuerSigningKey = this.GetTokenKey(),
                ClockSkew = TimeSpan.FromSeconds(this.jwtSettings.JwtClockSkew),
            }, out validated);
        }

        private SymmetricSecurityKey GetTokenKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.jwtSettings.JwtKey));
        }
    }
}
