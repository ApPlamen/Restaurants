namespace DAL.ViewModels
{
    public class RestaurantViewModel : BaseViewModel<string>
    {
        public string Name { get; set; }

        public string CompanyName { get; set; }

        public CompanyViewModel Company { get; set; }

        public bool CanManageRestaurantWorkers { get; set; }

        public bool CanManageRestaurantAdmins { get; set; }
    }
}
