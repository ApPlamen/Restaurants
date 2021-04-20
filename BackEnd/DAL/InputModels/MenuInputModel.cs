namespace DAL.InputModels
{
    public class MenuInputModel : BaseInputModel<string>
    {
        public override bool IsIdEmpty()
        {
            return string.IsNullOrWhiteSpace(Id);
        }
    }
}
