namespace Common.Authentication
{
    public class JwtOptions
    {
        public string JwtKey { get; set; }

        public string JwtIssuer { get; set; }

        public int JwtExpiresIn { get; set; }

        public int JwtRefreshExpiresIn { get; set; }

        public int JwtClockSkew { get; set; }
    }
}
