using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class BaseDALModel<IdType> : IBaseDALModel<IdType>
    {
        [Key]
        public IdType Id { get; set; }
    }
}
