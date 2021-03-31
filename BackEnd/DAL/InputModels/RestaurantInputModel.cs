namespace DAL.InputModels
{
    public class RestaurantInputModel : BaseInputModel<string>
    {
        public string Name { get; set; }

        public CompanyInputModel Company { get; set; }

        public override bool IsIdEmpty()
        {
            return string.IsNullOrWhiteSpace(Id);
        }
    }
}
