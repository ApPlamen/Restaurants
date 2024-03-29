﻿namespace DAL.InputModels
{
    public class UserInputModel : BaseInputModel<string>
    {
        public string UserName { get; set; }

        public string Email { get; set; }

        public string Fullname { get; set; }

        public override bool IsIdEmpty()
        {
            return string.IsNullOrWhiteSpace(Id);
        }
    }
}
