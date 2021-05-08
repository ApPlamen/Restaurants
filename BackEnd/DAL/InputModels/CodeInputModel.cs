using System.ComponentModel.DataAnnotations;

namespace DAL.InputModels
{
    public class CodeInputModel
    {
        [Required]
        public string Code { get; set; }
    }
}
