using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class NamingFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompletedOrderedItems_CompletedOrder_OrderId",
                table: "CompletedOrderedItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompletedOrder",
                table: "CompletedOrder");

            migrationBuilder.RenameTable(
                name: "CompletedOrder",
                newName: "CompletedOrders");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompletedOrders",
                table: "CompletedOrders",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CompletedOrderedItems_CompletedOrders_OrderId",
                table: "CompletedOrderedItems",
                column: "OrderId",
                principalTable: "CompletedOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompletedOrderedItems_CompletedOrders_OrderId",
                table: "CompletedOrderedItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompletedOrders",
                table: "CompletedOrders");

            migrationBuilder.RenameTable(
                name: "CompletedOrders",
                newName: "CompletedOrder");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompletedOrder",
                table: "CompletedOrder",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CompletedOrderedItems_CompletedOrder_OrderId",
                table: "CompletedOrderedItems",
                column: "OrderId",
                principalTable: "CompletedOrder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
