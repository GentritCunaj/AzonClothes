
using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using System.Xml.Linq;
using System.Reflection.Metadata;

namespace Azon.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {

        [HttpPost]
        public async Task<IActionResult> UploadImageAsync(IFormFile image)
        {
            // Process the uploaded image (save to disk, database, etc.)
            // Note: You should add additional validation, error handling, and security measures
            string chromeDriver = @"C:\Users\Gentrit\source\repos\Azon\Azon\bin\Debug\net6.0";
            /*            var chromeOptions = new ChromeOptions();
                        chromeOptions.AddArguments("headless");*/
            ChromeOptions options = new ChromeOptions();
            options.AddArgument("--headless=new");
            options.AddArgument("--window-size=1920x1080"); // Set a reasonable window size

            // Disable GPU acceleration (some websites may behave better)
            options.AddArgument("--disable-gpu");

            // Disable the sandbox (some websites may require this)
            options.AddArgument("--no-sandbox");
            options.AddUserProfilePreference("download.default_directory", "Downloads");
            options.AddUserProfilePreference("download.prompt_for_download", false);
            options.AddUserProfilePreference("safebrowsing.enabled", false);
/*            options.AddArgument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0");*/
            if (image != null && image.Length > 0)
            {
                using (var driver = new ChromeDriver(chromeDriver,options))
                {
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                    string downloadsFolder = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), "Downloads");

                    // Define the directory where you want to save the file
                    string uploadPath = Path.Combine(downloadsFolder, fileName);

                    // Save the file to the server
                    using (var fileStream = new FileStream(uploadPath, FileMode.Create))
                    {
                        await image.CopyToAsync(fileStream);
                    }

                    // Now, you have the physical path of the saved file
                    string physicalPath = Path.GetFullPath(uploadPath);

                    // You can use 'physicalPath' as needed

                    // Example: Save the image to the server
                    driver.Navigate().GoToUrl("https://photoscissors.com");
                    Thread.Sleep(3000);
                    // Wait for the file input element to be present

                    IWebElement fileInput = FindHiddenElementById(driver, ".dz-hidden-input");

                   
                    fileInput.SendKeys(uploadPath);
                    Thread.Sleep(4000);
                    IWebElement download = FindDownloadButton(driver);
                    download.Click();
                    Thread.Sleep(3000);
                    IWebElement downloadRes = FindDownloadResButton(driver);
                    downloadRes.Click();
                    Thread.Sleep(3000);


                    // Specify the expected file name
                    string expectedFileName = "result.png";

                    // Combine the Downloads folder path with the expected file name
                    string downloadPath = Path.Combine(downloadsFolder, expectedFileName);

                    // Check if the file exists
                 
                    if (System.IO.File.Exists(downloadPath))
                    {
                        /*FileResult pnImage =  PhysicalFile(downloadPath, "application/octet-stream", enableRangeProcessing: true);*/
                        driver.Navigate().GoToUrl("https://www.vectorizer.io");
                        Thread.Sleep(3000);
                        IWebElement vectorizerInput = FindHiddenElementById(driver, "#file");
                        vectorizerInput.SendKeys(downloadPath);
                        Thread.Sleep(4000);

                        IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
                        WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
                        // Use JavaScript to find the element even if it's hidden
                        IWebElement filledLayers =  wait.Until(d => (IWebElement)js.ExecuteScript("return document.querySelector('button[name=\"algorithm\"][value=\"4\"]');"));
                        filledLayers.Click();
                        IWebElement colors = wait.Until(d => (IWebElement)js.ExecuteScript("return document.querySelector('input[name=\"colors\"][title=\"4\"]');"));
                        colors.Click();
                        string targetClass = "img-fluid";
                        var svgElement = wait.Until(d => d.FindElement(By.CssSelector($"svg.{targetClass}")));
                        Thread.Sleep(3000);
                        System.IO.File.Delete(downloadPath);
                        System.IO.File.Delete(uploadPath);
                        if (svgElement != null)
                        {
                            // Return the inner HTML of the SVG element
                            return Ok(svgElement.GetAttribute("innerHTML"));
                        }
                        else
                        {
                            return NotFound();
                        }




                    }

                    else
                    {
                        return BadRequest(new { Message = "Image Not Found" });
                    }


                  
                }
            }
            else
            {
                return BadRequest(new { Message = "Invalid image file" });
            }
        }

     

        static void DownloadImage(string imageUrl, string outputPath)
        {
            using (var webClient = new WebClient())
            {
                webClient.DownloadFile(imageUrl, outputPath);
            }
        }

        static IWebElement FindHiddenElementById(IWebDriver driver, string elementId)
        {
            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(20));
            // Use JavaScript to find the element even if it's hidden
            return wait.Until(d => (IWebElement)js.ExecuteScript($"return document.querySelector('{elementId}');"));

        }
        static IWebElement FindDownloadButton(IWebDriver driver)
        {
            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            return wait.Until(d => (IWebElement)js.ExecuteScript(
            "var xpathExpression = \"//button[contains(@class, 'bp4-button bp4-intent-primary')]//span[contains(@class, 'bp4-button-text') and text()='Download']\";" +
            "return document.evaluate(xpathExpression, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;"));
        }

        static IWebElement FindDownloadResButton(IWebDriver driver)
        {
            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            return wait.Until(d => (IWebElement)js.ExecuteScript(
            "var xpathExpression = \"//button[contains(@class, 'bp4-button')]//span[contains(@class, 'bp4-button-text') and text()='Download in Low Resolution']\";" +
            "return document.evaluate(xpathExpression, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;"));
        }





        static void SetFileInputWithJavaScript(IWebDriver driver, IWebElement element, string filePath)
        {
            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            

        }

        [HttpGet]
        public async Task<IActionResult> GetSvg()
        {
            string chromeDriver = @"C:\Users\Gentrit\source\repos\Azon\Azon\bin\Debug\net6.0";
            string targetUrl = "https://www.vectorizer.io/images/4fXXGewPAAxLIt/x1080.html"; // Replace with the target webpage URL
            string targetClass = "img-fluid"; // Replace with the desired SVG class
            using (var driver = new ChromeDriver(chromeDriver))
            {
                // Navigate to the target URL
                driver.Navigate().GoToUrl(targetUrl);

                // Set up an explicit wait for a maximum of 10 seconds
                var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(60));

                // Wait for an SVG element with the specified class to be present on the page
                var svgElement = wait.Until(d => d.FindElement(By.CssSelector($"svg.{targetClass}")));
                Thread.Sleep(3000);

                if (svgElement != null)
                {
                    // Return the inner HTML of the SVG element
                    return Ok(svgElement.GetAttribute("innerHTML"));
                }
                else
                {
                    return NotFound();
                }


            }

        }

        
    }
}
