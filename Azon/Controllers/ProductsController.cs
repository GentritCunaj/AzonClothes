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

namespace Azon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AzonContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ProductsController(AzonContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;   
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Product>>>> GetProducts()
        {
            var response = new ServiceResponse<List<Product>>();
            var products = await _context.Products.Where(p => p.PicturePath != null).ToListAsync();
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

        // GET: api/Products/5

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Product>>> GetSingleProduct(int id)
        {
            var response = new ServiceResponse<Product>();
            var product = await _context.Products.Where(p => p.ProductId == id).FirstOrDefaultAsync();
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

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<ServiceResponse<Product>>> PutProduct(int id, UpdateProductDto productdto)
        {
            var response = new ServiceResponse<Product>();
            var product = await _context.Products.Where(p => p.ProductId == id).FirstOrDefaultAsync();
            if (product != null)
            {
                product.Description = productdto.Description;
                product.Price = productdto.Price;
                product.OldPrice = productdto.OldPrice;
                product.Size = productdto.Size;
                product.inStock = productdto.inStock;
                if (productdto.ImageFile != null)
                {
                    string folder = "assets/";
                    string fullpath = folder += productdto.ImageFile.FileName;
                    string pathFolder = Path.Combine(_webHostEnvironment.WebRootPath, folder);
                    var exists = System.IO.File.Exists(Path.Combine(pathFolder, productdto.ImageFile.FileName));
                    if (exists)
                    {
                      
                    }
                    else
                    {
                        await productdto.ImageFile.CopyToAsync(new FileStream(pathFolder, FileMode.Create));
                    }
                  
                    product.PicturePath = fullpath;

                }
                await _context.SaveChangesAsync();
                response.Success = true;
                response.Message = "Updated successfully";
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

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ServiceResponse<Product>>> PostProduct([FromBody]AddProductDto productdto)
        {
            var response = new ServiceResponse<Product>();
            if (productdto != null)
            {
                Product p = new Product
                {
                    Size = productdto.Size,
                    Color = productdto.Color,
                    Description = productdto.Description,
                    Price = productdto.Price,
                    OldPrice = productdto.OldPrice,
                    inStock = productdto.inStock,
                    Type = productdto.Type,

                };
                /*if (image != null)
                {
                    string folder = "assets/";
                    folder += image.FileName;
                    string pathFolder = Path.Combine(_webHostEnvironment.WebRootPath, folder);
                
                    await image.CopyToAsync(new FileStream(pathFolder, FileMode.Create));
                    p.PicturePath = "assets/" + p.ImageFile?.FileName;

                }*/
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
        public async Task<ActionResult<ServiceResponse<string>>> DeleteProduct(int id)
        {
            var response = new ServiceResponse<string>();

            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                response.Success = false;
                response.Message = "No product found";
                response.Data = null;
            }

            response.Success = true;
            response.Message = "Product deleted";
            response.Data = null;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return response;
       
        }

    }
}
