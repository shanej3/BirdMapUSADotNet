using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

// Add services to the container.
// I commented out some things the original DatingApp tutorial did, may use them in the future

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

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

builder.Services.AddScoped<IUserBirdService, UserBirdService>();

builder.Services.AddScoped<ITokenService, TokenService>();

// JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var tokenKey = builder.Configuration["TokenKey"] ?? throw new Exception("TokenKey not found");
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors("AllowAngularApp");

app.MapControllers();

app.Run();
