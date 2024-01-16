using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Azon.Migrations
{
    /// <inheritdoc />
    public partial class addOriginalProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OriginalProductId",
                table: "WishlistItems",
                type: "int",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_WishlistItems_OriginalProductId",
                table: "WishlistItems",
                column: "OriginalProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_WishlistItems_Products_OriginalProductId",
                table: "WishlistItems",
                column: "OriginalProductId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.NoAction,
                onUpdate:ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishlistItems_Products_OriginalProductId",
                table: "WishlistItems");

            migrationBuilder.DropIndex(
                name: "IX_WishlistItems_OriginalProductId",
                table: "WishlistItems");

            migrationBuilder.DropColumn(
                name: "OriginalProductId",
                table: "WishlistItems");
        }
    }
}
