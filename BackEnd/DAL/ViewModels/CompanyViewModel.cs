﻿using System.Collections.Generic;

namespace DAL.ViewModels
{
    public class CompanyViewModel : BaseViewModel<string>
    {
        public string Name { get; set; }

        public IEnumerable<string> Owners { get; set; }
    }
}