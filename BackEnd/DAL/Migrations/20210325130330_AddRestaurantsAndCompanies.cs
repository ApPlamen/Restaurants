using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class AddRestaurantsAndCompanies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CompanyUserRole",
                columns: table => new
                {
                    CompaniesId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserRolesUserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserRolesRoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyUserRole", x => new { x.CompaniesId, x.UserRolesUserId, x.UserRolesRoleId });
                    table.ForeignKey(
                        name: "FK_CompanyUserRole_AspNetUserRoles_UserRolesUserId_UserRolesRoleId",
                        columns: x => new { x.UserRolesUserId, x.UserRolesRoleId },
                        principalTable: "AspNetUserRoles",
                        principalColumns: new[] { "UserId", "RoleId" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompanyUserRole_Companies_CompaniesId",
                        column: x => x.CompaniesId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Restaurants",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompanyId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Restaurants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Restaurants_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RestaurantUserRole",
                columns: table => new
                {
                    RestaurantsId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserRolesUserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserRolesRoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RestaurantUserRole", x => new { x.RestaurantsId, x.UserRolesUserId, x.UserRolesRoleId });
                    table.ForeignKey(
                        name: "FK_RestaurantUserRole_AspNetUserRoles_UserRolesUserId_UserRolesRoleId",
                        columns: x => new { x.UserRolesUserId, x.UserRolesRoleId },
                        principalTable: "AspNetUserRoles",
                        principalColumns: new[] { "UserId", "RoleId" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RestaurantUserRole_Restaurants_RestaurantsId",
                        column: x => x.RestaurantsId,
                        principalTable: "Restaurants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CompanyUserRole_UserRolesUserId_UserRolesRoleId",
                table: "CompanyUserRole",
                columns: new[] { "UserRolesUserId", "UserRolesRoleId" });

            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_CompanyId",
                table: "Restaurants",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_RestaurantUserRole_UserRolesUserId_UserRolesRoleId",
                table: "RestaurantUserRole",
                columns: new[] { "UserRolesUserId", "UserRolesRoleId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CompanyUserRole");

            migrationBuilder.DropTable(
                name: "RestaurantUserRole");

            migrationBuilder.DropTable(
                name: "Restaurants");

            migrationBuilder.DropTable(
                name: "Companies");
        }
    }
}
