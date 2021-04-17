using System.ComponentModel.DataAnnotations;

namespace DAL.InputModels
{
    public class RestaurantInputModel : BaseInputModel<string>
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string LegalId { get; set; }

        [Required]
        public string CompanyLegalId { get; set; }

        public override bool IsIdEmpty()
        {
            return string.IsNullOrWhiteSpace(Id);
        }
    }
}
