namespace DAL.InputModels
{
    public class MenuItemInputModel : BaseInputModel<string>
    {
        public override bool IsIdEmpty()
        {
            return string.IsNullOrWhiteSpace(Id);
        }
    }
}
