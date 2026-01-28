using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddPasswordHash : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "Users",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "bob-id",
                column: "PasswordHash",
                value: "$2a$11$8.XW7z3qKxJL1LL1V8YwMuJXhYD8E8E6H8L3/9nq3RN0D7C6JvT3K");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "john-id",
                column: "PasswordHash",
                value: "$2a$11$8.XW7z3qKxJL1LL1V8YwMuJXhYD8E8E6H8L3/9nq3RN0D7C6JvT3K");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "shane-id",
                column: "PasswordHash",
                value: "$2a$11$8.XW7z3qKxJL1LL1V8YwMuJXhYD8E8E6H8L3/9nq3RN0D7C6JvT3K");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Users");
        }
    }
}
