using System.Collections.Generic;

namespace DAL.ViewModels
{
    public class CompanyBoardViewModel : BaseViewModel<string>
    {
        public string Name { get; set; }

        public string LegalId { get; set; }

        public IEnumerable<string> Owners { get; set; }
    }
}
