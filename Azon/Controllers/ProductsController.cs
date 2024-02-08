using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Azon.Data;
using Azon.Models;

using Microsoft.AspNetCore.Hosting;
using Microsoft.CodeAnalysis;
using System.Security.Claims;
using NuGet.ContentModel;
using Stripe;
using Product = Azon.Models.Product;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using Stripe.Climate;
using System.Collections;

namespace Azon.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase, IProductsController
    {
        private readonly AzonContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly GoogleCredential _googleCredential;
        private readonly StorageClient _client;
        public ProductsController(AzonContext context, IWebHostEnvironment hostingEnvironment, IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
            _webHostEnvironment = webHostEnvironment;
            _httpContextAccessor = httpContextAccessor;
            string credentialPath = Path.Combine(_hostingEnvironment.WebRootPath, "optical-metric-411818-b3e4d1c73897.json");
    
            _googleCredential = GoogleCredential.FromFile(credentialPath);
            _client = StorageClient.Create(_googleCredential);
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Product>>>> GetProducts()
        {
            var response = new ServiceResponse<List<Product>>();
            var products = await _context.Products
                .Include(p => p.ColorVariants)
                .ThenInclude(cv => cv.StockOptions).Where(p => (bool)p.isAvailable)
                .ToListAsync();
            if (products != null)
            {
                response.Success = true;
                response.Message = "Products retrieved";
                response.Data = products;
            }
            else
            {
                response.Success = false;
                response.Message = "No products in stock";
                response.Data = null;
            }
            return response;
        }

        [HttpDelete("cv/{id}")]
        public async Task<ActionResult<ServiceResponse<Product?>>> DeleteCV(int id)
        {
            var response = new ServiceResponse<Product?>();

            var cv = await _context.ColorVariants
                .Include(cv => cv.Product) // Include the associated product
                .FirstOrDefaultAsync(cv => cv.ColorVariantId == id);

            if (cv == null)
            {
                response.Success = false;
                response.Message = "No cv found";

                return response;
            }

            var product = cv.Product;

            response.Success = true;
            response.Message = "cv deleted";
            response.Data = product; // Use a separate property for the returned data

            _context.ColorVariants.Remove(cv);
            await _context.SaveChangesAsync();

            return response;
        }

        [HttpGet("all")]
        public async Task<ActionResult<ServiceResponse<List<Product>>>> GetAllProducts()
        {
            var response = new ServiceResponse<List<Product>>();
            var role = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            var products = await _context.Products
                .Include(p => p.ColorVariants)
                .ThenInclude(cv => cv.StockOptions)
                .ToListAsync();
            if (role != "Admin")
            {
                response.Success = true;
                response.Message = "Products retrieved";
                response.Data = products;
            }
            else
            {
                response.Success = false;
                response.Message = "Not allowed";
                response.Data = null;
            }
            return response;
        }



        // GET: api/Products/5

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Product>>> GetSingleProduct(int id)
        {
            var response = new ServiceResponse<Product>();
            var product = await _context.Products
                .Include(p => p.ColorVariants)
                .ThenInclude(cv => cv.StockOptions)
                .FirstOrDefaultAsync(p => p.ProductId == id);
            if (product != null)
            {
                response.Success = true;
                response.Message = "Retrieved successfully";
                response.Data = product;
            }
            else
            {

                response.Success = false;
                response.Message = "Product doesnt exist";
                response.Data = null;


            }
            return response;

        }
        [HttpPut("edit/{id}")]
        public async Task<ActionResult<ServiceResponse<Product>>> PutProduct(int id, [FromForm] ProductEditDto productUpdated)
        {
            var response = new ServiceResponse<Product>();
            var product = await _context.Products
                .Include(p => p.ColorVariants)
                .ThenInclude(cv => cv.StockOptions)
                .FirstOrDefaultAsync(p => p.ProductId == id);
            try
            {
                product.Name = productUpdated.Name;
                product.Price = productUpdated.Price;
                product.Price = productUpdated.Price;
                product.OldPrice = productUpdated.OldPrice;
                product.ColorVariants = productUpdated.ColorVariants;
                for (var i = 0; i < product.ColorVariants.Count; i++)
                {
                    product.ColorVariants[i].StockOptions = productUpdated.ColorVariants[i].StockOptions;
                    if (product.ColorVariants[i].Image != null)
                    {
                      

                        byte[] byteArray;
                        using (MemoryStream memoryStream = new MemoryStream())
                        {
                            product.ColorVariants[i].Image.CopyTo(memoryStream);

                            // Convert MemoryStream to byte array
                            byteArray = memoryStream.ToArray();
                        }

                        var obj = await _client.UploadObjectAsync("azondesigns", "hoodies/" +product.ColorVariants[i].Image.FileName, product.ColorVariants[i].Image.ContentType, new MemoryStream(byteArray));
                        product.ColorVariants[i].PicturePath = product.ColorVariants[i].Image.FileName;
                        /* string pathFolder = Path.Combine(@"C:\Users\Gentrit\source\repos\Azon\react-app\src", fullpath);
                         var exists = System.IO.File.Exists(Path.Combine(pathFolder));
                         if (exists)
                         {

                         }
                         else
                         {

                             await product.ColorVariants[i].Image.CopyToAsync(new FileStream(pathFolder, FileMode.Create));


                         }
                         product.ColorVariants[i].PicturePath = "assets/" + product.ColorVariants[i].Image?.FileName;*/
                    }

                }
                product.Description = productUpdated.Description;
                product.ImageFile = null;
                decimal discountPercentage = ((decimal)(productUpdated.OldPrice - productUpdated.Price) / (decimal)productUpdated.OldPrice) * 100;


                product.Discount = (int)Math.Round(discountPercentage);
                await _context.SaveChangesAsync();
                response.Success = true;
                response.Message = "Updated successfully";
                response.Data = product;

            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"An error occurred: {ex.Message}";

            }
            return response;


        }




        [HttpPost]
        public async Task<ActionResult<ServiceResponse<Product>>> PostProduct(productDto productdto)
        {
            var response = new ServiceResponse<Product>();
            if (productdto != null)
            {
                Product p = new Product
                {
                    Description = productdto.Description,
                    Price = productdto.Price,
                    OldPrice = productdto.OldPrice,
                    Vector = productdto?.Vector,
                    Notes = productdto?.Notes,
                    Name = productdto.Name,
                    isAvailable = productdto?.isAvailabe

                };
                ColorVariant v = new ColorVariant
                {
                    HexCode = productdto.ColorHexCode,
                    PicturePath = productdto.PicturePath
                };

                StockOption s = new StockOption
                {
                    Size = productdto.Size,
                    StockQuantity = productdto.StockQuantity
                };

                v.StockOptions.Add(s);
                p.ColorVariants.Add(v);


                if (productdto?.ImageFile != null)
                {

                 
        
                    if (FileExists("azondesigns","hoodies/"+ productdto.ImageFile.FileName))
                    {

                    }
                    else
                    {


                        byte[] byteArray;
                        using (MemoryStream memoryStream = new MemoryStream())
                        {
                            productdto.ImageFile.CopyTo(memoryStream);

                            // Convert MemoryStream to byte array
                            byteArray = memoryStream.ToArray();
                        }

                        var obj = await _client.UploadObjectAsync("azondesigns", "hoodies/" + productdto.ImageFile?.FileName, productdto.ImageFile?.ContentType, new MemoryStream(byteArray));
      

                    }
                    p.PicturePath = productdto.ImageFile?.FileName;
                    v.PicturePath = productdto.ImageFile?.FileName;
                }
                else
                {
                    p.PicturePath = productdto.PicturePath;
                }

                if (productdto?.DesignFile != null)
                {
                    byte[] byteArray;
                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        productdto.DesignFile.CopyTo(memoryStream);

                        // Convert MemoryStream to byte array
                        byteArray = memoryStream.ToArray();
                    }

                    var obj = await _client.UploadObjectAsync("azondesigns", productdto.DesignFile?.FileName, productdto.DesignFile?.ContentType, new MemoryStream(byteArray));


                }


                decimal discountPercentage = ((decimal)(productdto.OldPrice - productdto.Price) / (decimal)productdto.OldPrice) * 100;

                p.Discount = (int)Math.Round(discountPercentage);
                _context.Products.Add(p);
                await _context.SaveChangesAsync();
                response.Success = true;
                response.Message = "Added successfully";
                response.Data = p;

            }
            else
            {
                response.Success = false;
                response.Message = "No product";
                response.Data = null;
            }
            return response;

        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<List<Product>>>> DeleteProduct(int id)
        {
            var response = new ServiceResponse<List<Product>>();

            var product = await _context.Products.FindAsync(id);
            var products = await _context.Products
                .Include(p => p.ColorVariants)
                .ThenInclude(cv => cv.StockOptions)
                .ToListAsync();

            if (product == null)
            {
                response.Success = false;
                response.Message = "No product found";
                response.Data = products;
            }
            else
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();

                // Remove the deleted product from the list
                products.RemoveAll(p => p.ProductId == id);

                response.Success = true;
                response.Message = "Product deleted";
                response.Data = products;
            }

            return response;
        }

        private interface HasImageFile
        {
            public IFormFile ImageFile { get; set; }
            public string PicturePath { get; set; }
        }

        private bool FileExists(string bucketName, string fileName)
        {
            var objects = _client.ListObjects(bucketName, Path.GetDirectoryName(fileName)).ToArray();
            return objects.Any(x => x.Name == fileName);
        }




    }
}
