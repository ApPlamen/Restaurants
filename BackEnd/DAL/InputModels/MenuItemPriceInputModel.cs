using System.ComponentModel.DataAnnotations;

namespace DAL.InputModels
{
    public class MenuItemPriceInputModel : BaseInputModel<string>
    {
        [Required]
        public string Type { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public string MenuItemId { get; set; }

        public override bool IsIdEmpty()
        {
            return string.IsNullOrWhiteSpace(Id);
        }
    }
}
