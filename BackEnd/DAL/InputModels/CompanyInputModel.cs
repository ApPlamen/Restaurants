using System.ComponentModel.DataAnnotations;

namespace DAL.InputModels
{
    public class CompanyInputModel : BaseInputModel<string>
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string LegalId { get; set; }

        public override bool IsIdEmpty()
        {
            return string.IsNullOrWhiteSpace(Id);
        }
    }
}
