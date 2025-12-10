using API.Interfaces;
using API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// I commented out some things the original DatingApp tutorial did, may use them in the future

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();  // may use; tutorial skips this
builder.Services.AddCors();

builder.Services.AddHttpClient<IEbirdService, EbirdService>(client =>
{
    client.BaseAddress = new Uri("https://api.ebird.org/v2/");
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// app.UseHttpsRedirection();

// app.UseAuthorization();

app.UseCors(options =>
{
    options.AllowAnyHeader()
           .AllowAnyMethod()
           .WithOrigins("http://localhost:5002", "https://localhost:5002", "http://localhost:4200", "https://localhost:4200"); 
           
});

app.MapControllers();

app.Run();
