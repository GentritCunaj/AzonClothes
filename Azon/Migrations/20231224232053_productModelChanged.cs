using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Azon.Migrations
{
    /// <inheritdoc />
    public partial class productModelChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "inStock",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Products",
                newName: "Name");

            migrationBuilder.CreateTable(
                name: "ColorVariants",
                columns: table => new
                {
                    ColorVariantId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HexCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ColorVariants", x => x.ColorVariantId);
                    table.ForeignKey(
                        name: "FK_ColorVariants_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StockOptions",
                columns: table => new
                {
                    StockOptionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Size = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StockQuantity = table.Column<int>(type: "int", nullable: false),
                    ColorVariantId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockOptions", x => x.StockOptionId);
                    table.ForeignKey(
                        name: "FK_StockOptions_ColorVariants_ColorVariantId",
                        column: x => x.ColorVariantId,
                        principalTable: "ColorVariants",
                        principalColumn: "ColorVariantId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ColorVariants_ProductId",
                table: "ColorVariants",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_StockOptions_ColorVariantId",
                table: "StockOptions",
                column: "ColorVariantId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StockOptions");

            migrationBuilder.DropTable(
                name: "ColorVariants");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Products",
                newName: "Type");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Size",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "inStock",
                table: "Products",
                type: "int",
                nullable: true);
        }
    }
}
