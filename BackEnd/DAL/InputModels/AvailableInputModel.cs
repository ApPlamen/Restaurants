namespace DAL.InputModels
{
    public class AvailableInputModel<IdType>
    {
        public IdType Id { get; set; }

        public bool Available { get; set; }
    }
}
