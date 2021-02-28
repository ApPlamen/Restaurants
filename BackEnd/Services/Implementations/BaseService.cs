using AutoMapper;
using DAL.Repository;

namespace Services
{
    public class BaseService<T> : IBaseService where T : class, new()
    {
        protected readonly IMapper mapper;
        protected readonly IRepository<T> repo;

        public BaseService(IMapper mapper,
            IRepository<T> repo)
        {
            this.mapper = mapper;
            this.repo = repo;
        }
    }
}
