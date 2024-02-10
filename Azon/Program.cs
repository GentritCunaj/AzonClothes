using OpenQA.Selenium;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Azon.Data;
using Azon.Areas.Identity.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using Azon.Models;
using System.Text.Json.Serialization;
using Stripe;
using System.Configuration;
using Azon.Controllers;
using ClientShopping.Controllers;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    EnvironmentName = Environments.Development
});

var connectionString = builder.Configuration.GetConnectionString("AzonContextConnection") ?? throw new InvalidOperationException("Connection string 'AzonContextConnection' not found.");


// Add services to the container.
var jwtIssuer = builder.Configuration.GetSection("Jwt:Issuer").Get<string>();
var jwtKey = builder.Configuration.GetSection("Jwt:Key").Get<string>();
var jwtAud = builder.Configuration.GetSection("Jwt:Audience").Get<string>();

builder.Services.AddDbContext<AzonContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.BuildServiceProvider().GetService<AzonContext>().Database.Migrate();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddScoped<IAuthController, AuthController>();
builder.Services.AddScoped<IHomeController, HomeController>();
builder.Services.AddScoped<IPaymentsController, PaymentsController>();
builder.Services.AddScoped<IShippingController, ShippingController>();
builder.Services.AddScoped<IOrderController, OrderController>();
builder.Services.AddScoped<IProductsController, ProductsController>();
builder.Services.AddScoped<IWishListController, WishListController>();
builder.Services.AddControllers();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(60);

    options.Cookie.IsEssential = true;

});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IAuthentication, Authentication>();
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

builder.Services.AddControllers().AddJsonOptions(options =>
{

    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

var clientId = builder.Configuration.GetSection("Authentication:ClientId").Get<string>();
var clientSecret = builder.Configuration.GetSection("Authentication:ClientSecret").Get<string>();

builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = @" Standard Authorization header using the Bearer scheme. Example: 'Bearer {token}'",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    c.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.AddAuthentication(options =>
{

    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
});

builder.Services.Configure<StripeSettings>(builder.Configuration.GetSection("Stripe"));
builder.Services.AddScoped<IStripeService, StripeService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
 .AddJwtBearer(options =>
 {
     options.TokenValidationParameters = new TokenValidationParameters
     {
         ValidateIssuer = true,
         ValidateAudience = true,
         ValidateLifetime = true,
         ValidateIssuerSigningKey =true,
         ValidIssuer = jwtIssuer,
         ValidAudience = jwtAud,

         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
     };
 });

builder.Services.AddAuthentication().AddGoogle(googleOptions =>
{
    googleOptions.ClientId = clientId;
    googleOptions.ClientSecret = clientSecret;
});


builder.Services.AddIdentityApiEndpoints<ApplicationUser>().AddRoles<IdentityRole>().AddDefaultTokenProviders().AddEntityFrameworkStores<AzonContext>(); 
builder.Services.AddCors(p => p.AddPolicy("corspolicy", build =>
{
    build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));
builder.Services.Configure<IdentityOptions>(options =>
{
    options.SignIn.RequireConfirmedEmail = false;
});

var app = builder.Build();


// Configure the HTTP request pipeline.
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = string.Empty;
});


app.MapIdentityApi<ApplicationUser>();


app.UseSession();
app.Use(async (context, next) =>
{
    var token = context.Session.GetString("Token");
    if (!string.IsNullOrEmpty(token))
    {
        context.Request.Headers["Authorization"] = "Bearer " + token;
    }
    await next();
});


app.UseCors("corspolicy");
app.UseHttpsRedirection();
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

