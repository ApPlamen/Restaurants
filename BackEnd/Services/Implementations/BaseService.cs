using AutoMapper;
using DAL.Models;
using DAL.Repository;
using Microsoft.AspNetCore.Identity;

namespace Services
{
    public class BaseService<T> : IBaseService where T : class, new()
    {
        protected readonly IMapper mapper;
        protected readonly IRepository<T> repo;
        protected readonly UserManager<User> userManager;

        public BaseService(IMapper mapper,
            IRepository<T> repo,
            UserManager<User> userManager)
        {
            this.mapper = mapper;
            this.repo = repo;
            this.userManager = userManager;
        }
    }
}
