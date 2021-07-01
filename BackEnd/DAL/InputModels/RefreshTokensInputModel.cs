using System.ComponentModel.DataAnnotations;

namespace DAL.InputModels
{
    public class RefreshTokensInputModel
    {
        [Required]
        public string RefreshToken { get; set; }
    }
}
