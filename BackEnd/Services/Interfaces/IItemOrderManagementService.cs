using DAL.InputModels;

namespace Services
{
    public interface IItemOrderManagementService
    {
        void SetOrderedItemStatus(OrderedItemStatusInputModel model);

        void AskToRemove(OrderedItemStatusInputModel model);
    }
}
