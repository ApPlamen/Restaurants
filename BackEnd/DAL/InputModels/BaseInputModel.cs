namespace DAL.InputModels
{
    public abstract class BaseInputModel<IdType>
    {
        public IdType Id { get; set; }

        public abstract bool IsIdEmpty();
    }
}
