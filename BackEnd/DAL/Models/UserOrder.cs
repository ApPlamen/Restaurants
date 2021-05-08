namespace DAL.Models
{
    public class UserOrder
    {
        public string UserId { get; set; }

        public virtual User User { get; set; }

        public string OrderId { get; set; }

        public virtual Order Order { get; set; }
    }
}
