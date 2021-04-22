namespace DAL.ViewModels
{
    public class CompanyViewModel : BaseViewModel<string>
    {
        public string Name { get; set; }

        public string LegalId { get; set; }
    }
}
