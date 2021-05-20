using AutoMapper;
using DAL.InputModels;
using DAL.Models;
using DAL.Repository;
using Enums;
using Microsoft.AspNetCore.Identity;

namespace Services
{
    class ItemOrderManagementService : BaseService<MenuItemOrder>, IItemOrderManagementService
    {
        public ItemOrderManagementService(IMapper mapper,
            IRepository<MenuItemOrder> userOrder,
            UserManager<User> userManager)
            : base(mapper, userOrder, userManager)
        { }

        public void SetOrderedItemStatus(OrderedItemStatusInputModel model)
        {
            var itemOrdered = this.repo.GetById(model.ItemId);

            itemOrdered.OrderedItemStatus = (OrderedItemStatusesEnum)model.Status.Value;

            this.repo.Save();
        }

        public void AskToRemove(OrderedItemStatusInputModel model)
        {
            var itemOrdered = this.repo.GetById(model.ItemId);

            itemOrdered.OrderedItemStatus = OrderedItemStatusesEnum.AskedToRemove;

            this.repo.Save();
        }
    }
}
