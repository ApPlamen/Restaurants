namespace DAL.ViewModels
{
    public class RestaurantViewModel : BaseViewModel<string>
    {
        public string Name { get; set; }

        public string CompanyName { get; set; }

        public string LegalId { get; set; }

        public string CompanyLegalId { get; set; }
    }
}
