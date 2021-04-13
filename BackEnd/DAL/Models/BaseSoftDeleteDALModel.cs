namespace DAL.Models
{
    public class BaseSoftDeleteDALModel<IdType> : BaseDALModel<IdType>, IBaseSoftDeleteDALModel<IdType>
    {
        public bool IsActive { get; set; }
    }
}
