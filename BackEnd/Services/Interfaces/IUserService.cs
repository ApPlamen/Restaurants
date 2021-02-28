using System.Collections.Generic;
using DAL.InputModels;
using DAL.ViewModels;

namespace Services
{
    public interface IUserService : IBaseService
    {
        public IEnumerable<UserViewModel> GetAll();

        public UserViewModel Get(string id);

        public void Save(UserInputModel model);

        public void Delete(string id);
    }
}
