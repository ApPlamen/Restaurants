namespace DAL.Models
{
    public class MenuItemPrice : BaseSoftDeleteDALModel<string>
    {
        public string Type { get; set; }

        public decimal Price { get; set; }

        public string MenuItemId { get; set; }

        public MenuItem MenuItem { get; set; }
    }
}
