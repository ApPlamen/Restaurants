namespace DAL.ViewModels
{
    public class MenuItemViewModel : BaseViewModel<string>
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsAvailable { get; set; }
    }
}
