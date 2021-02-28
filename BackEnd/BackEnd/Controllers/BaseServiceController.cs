namespace Domain.Controllers
{
    public class BaseServiceController<T> : BaseApiController
    {
        protected readonly T service;

        public BaseServiceController(T service)
        {
            this.service = service;
        }
    }
}
