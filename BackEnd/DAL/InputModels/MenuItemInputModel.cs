using System.ComponentModel.DataAnnotations;

namespace DAL.InputModels
{
    public class MenuItemInputModel : BaseInputModel<string>
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string RestaurantId { get; set; }

        public override bool IsIdEmpty()
        {
            return string.IsNullOrWhiteSpace(Id);
        }
    }
}
