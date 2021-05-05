using DAL.InputModels;

namespace Services
{
    public interface IOrderService : IBaseService
    {
        string StartOrder(OrderDetailsInputModel orderDetails, string userId);

        void JionOrder(string orderId, string userId);

        string GetActiveOrder(string userId);

        void CloseOrder(string orderId, string userId);
    }
}
