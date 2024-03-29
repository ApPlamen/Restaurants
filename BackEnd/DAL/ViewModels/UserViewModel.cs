﻿namespace DAL.ViewModels
{
    public class UserViewModel : BaseViewModel<string>
    {
        public string UserName { get; set; }

        public string Email { get; set; }

        public string Fullname { get; set; }
    }
}
