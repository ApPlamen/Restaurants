using System.Collections.Generic;

namespace DAL.ViewModels
{
    public class UserTokensViewModel
    {
        public string AccessToken { get; set; }

        public string RefreshToken { get; set; }

        public List<string> Roles { get; set; }
    }
}
