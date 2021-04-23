namespace DAL.ViewModels
{
    public class MenuItemPriceViewModel : BaseViewModel<string>
    {
        public string Type { get; set; }

        public decimal Price { get; set; }
    }
}
