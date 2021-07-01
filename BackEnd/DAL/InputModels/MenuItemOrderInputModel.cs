namespace DAL.InputModels
{
    public class MenuItemOrderInputModel : BaseInputModel<string>
    {
        public override bool IsIdEmpty()
        {
            return string.IsNullOrWhiteSpace(Id);
        }
    }
}
