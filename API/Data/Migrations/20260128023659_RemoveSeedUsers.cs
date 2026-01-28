using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class RemoveSeedUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "bob-id");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "john-id");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "shane-id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "PasswordHash", "UserName" },
                values: new object[,]
                {
                    { "bob-id", "$2a$11$8.XW7z3qKxJL1LL1V8YwMuJXhYD8E8E6H8L3/9nq3RN0D7C6JvT3K", "Bob" },
                    { "john-id", "$2a$11$8.XW7z3qKxJL1LL1V8YwMuJXhYD8E8E6H8L3/9nq3RN0D7C6JvT3K", "John" },
                    { "shane-id", "$2a$11$8.XW7z3qKxJL1LL1V8YwMuJXhYD8E8E6H8L3/9nq3RN0D7C6JvT3K", "Shane" }
                });
        }
    }
}
