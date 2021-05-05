using System.ComponentModel.DataAnnotations;

namespace DAL.InputModels
{
    public class OrderDetailsInputModel
    {
        [Required]
        public string RestaurantName { get; set; }

        [Required]
        public string TableNumber { get; set; }
    }
}
