namespace DAL.InputModels
{
    public class AssignUserRoleInputModel
    {
        public string UserEmail { get; set; }

        public string RoleId { get; set; }

        public string Payload { get; set; }
    }
}
