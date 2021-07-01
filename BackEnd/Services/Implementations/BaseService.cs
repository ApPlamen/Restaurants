using AutoMapper;
using DAL.Models;
using DAL.Repository;
using Microsoft.AspNetCore.Identity;

namespace Services
{
    public class BaseService<DALModel> : IBaseService where DALModel : class, new()
    {
        protected readonly IMapper mapper;
        protected readonly IRepository<DALModel> repo;
        protected readonly UserManager<User> userManager;

        public BaseService(IMapper mapper,
            IRepository<DALModel> repo,
            UserManager<User> userManager)
        {
            this.mapper = mapper;
            this.repo = repo;
            this.userManager = userManager;
        }
    }
}
