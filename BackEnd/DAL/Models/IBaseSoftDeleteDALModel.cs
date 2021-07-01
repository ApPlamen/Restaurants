namespace DAL.Models
{
    public interface IBaseSoftDeleteDALModel<IdType> : IBaseDALModel<IdType>
    {
        public bool IsActive { get; set; }
    }
}
