using API.Interfaces;
using API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// I commented out some things the original DatingApp tutorial did, may use them in the future

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();  // may use; tutorial skips this

// CORS stuff
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .WithOrigins("http://localhost:5002", "https://localhost:5002", 
                          "http://localhost:4200", "https://localhost:4200");
    });
});

builder.Services.AddHttpClient<IEbirdService, EbirdService>(client =>
{
    client.BaseAddress = new Uri("https://api.ebird.org/v2/");
});
builder.Services.AddHttpClient<IRidbService, RidbService>(client =>
{
    client.BaseAddress = new Uri("https://ridb.recreation.gov/api/v1/");
});
builder.Services.AddHttpClient<INwsService, NwsService>(client =>
{
    client.BaseAddress = new Uri("https://api.weather.gov/");
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// app.UseHttpsRedirection();

// app.UseAuthorization();

app.UseCors("AllowAngularApp");

app.MapControllers();

app.Run();
