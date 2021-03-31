namespace DAL.InputModels
{
    public class CompanyInputModel : BaseInputModel<string>
    {
        public string Name { get; set; }

        public override bool IsIdEmpty()
        {
            return string.IsNullOrWhiteSpace(Id);
        }
    }
}
