using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Azon.Migrations
{
    /// <inheritdoc />
    public partial class shippingupdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "ShippingDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Info",
                table: "ShippingDetails",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Country",
                table: "ShippingDetails");

            migrationBuilder.DropColumn(
                name: "Info",
                table: "ShippingDetails");
        }
    }
}
