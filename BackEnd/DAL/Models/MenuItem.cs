namespace DAL.Models
{
    public class MenuItem : BaseSoftDeleteDALModel<string>
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsAvailable { get; set; }

        public string RestaurantId { get; set; }

        public Restaurant Restaurant { get; set; }
    }
}
