using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Azon.Migrations
{
    /// <inheritdoc />
    public partial class picturepathadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_AspNetUsers_CustomerId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_ShippingDetails_AspNetUsers_CustomerId",
                table: "ShippingDetails");

          

            migrationBuilder.AlterColumn<string>(
                name: "CustomerId",
                table: "ShippingDetails",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerId",
                table: "Products",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "PicturePath",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_AspNetUsers_CustomerId",
                table: "Products",
                column: "CustomerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ShippingDetails_AspNetUsers_CustomerId",
                table: "ShippingDetails",
                column: "CustomerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_AspNetUsers_CustomerId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_ShippingDetails_AspNetUsers_CustomerId",
                table: "ShippingDetails");

            migrationBuilder.DropColumn(
                name: "PicturePath",
                table: "Products");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerId",
                table: "ShippingDetails",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CustomerId",
                table: "Products",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

           

            migrationBuilder.AddForeignKey(
                name: "FK_Products_AspNetUsers_CustomerId",
                table: "Products",
                column: "CustomerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ShippingDetails_AspNetUsers_CustomerId",
                table: "ShippingDetails",
                column: "CustomerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
