using System.Collections.Generic;
using System.Security.Claims;

namespace Services
{
    public interface ITokenService : IBaseService
    {
        string GenerateJwtToken(List<Claim> claims, bool hasExpiration = true, double? expiresIn = null);

        string GenerateRefreshJwtToken(List<Claim> claims);

        void ValidateToken(string token, bool validateLifetime = true);
    }
}
