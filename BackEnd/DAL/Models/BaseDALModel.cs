namespace DAL.Models
{
    public class BaseDALModel<IdType> : IBaseDALModel<IdType>
    {
        public IdType Id { get; set; }
    }
}
