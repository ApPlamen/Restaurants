﻿namespace DAL.ViewModels
{
    public class MenuItemBoardViewModel : BaseViewModel<string>
    {
        public string Name { get; set; }

        public bool IsAvailable { get; set; }
    }
}
