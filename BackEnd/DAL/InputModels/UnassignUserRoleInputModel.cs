namespace DAL.InputModels
{
    public class UnassignUserRoleInputModel
    {
        public string UserId { get; set; }

        public string RoleId { get; set; }

        public string Payload { get; set; }
    }
}
