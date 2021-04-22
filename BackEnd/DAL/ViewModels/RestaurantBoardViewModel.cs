namespace DAL.ViewModels
{
    public class RestaurantBoardViewModel : BaseViewModel<string>
    {
        public string Name { get; set; }

        public string CompanyName { get; set; }

        public string LegalId { get; set; }

        public bool CanManageRestaurantWorkers { get; set; }

        public bool CanManageRestaurantAdmins { get; set; }
    }
}
