using System.ComponentModel.DataAnnotations;

namespace DAL.InputModels
{
    public class OrderedItemStatusInputModel
    {
        [Required]
        public int ItemId { get; set; }

        public int? Status { get; set; }
    }
}
