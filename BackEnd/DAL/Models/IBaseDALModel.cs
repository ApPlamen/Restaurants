namespace DAL.Models
{
    public interface IBaseDALModel<IdType>
    {
        public IdType Id { get; set; }
    }
}
