
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
using Google.Cloud.Storage.V1;
using Google.Apis.Auth.OAuth2;
using WebDriverManager.DriverConfigs.Impl;
using WebDriverManager;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using System.Collections.ObjectModel;
using SeleniumExtras.WaitHelpers;
using NuGet.ContentModel;
using Azon.Models;
using OpenQA.Selenium.Interactions;

namespace Azon.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HomeController : ControllerBase, IHomeController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IWebDriver _webDriver;
        public ChromeOptions opt;
        public HomeController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            opt = GetOptions();
            _webDriver = GetDriverAsync(opt);
        }

        private ChromeOptions? GetOptions()
        {
            ChromeOptions options = new ChromeOptions();

            options.AddArgument("--no-sandbox");
            options.AddArgument("--disable-dev-shm-usage");
            options.AddArgument("--headless=new");
            options.AddArgument("--ignore-ssl-errors=true");
            options.AddArgument("--ignore-certificate-errors");



            options.AddArgument("--window-size=1920x1080");

            options.AddArgument("--disable-gpu");


            options.AddUserProfilePreference("download.default_directory", "Downloads");
            options.AddUserProfilePreference("download.prompt_for_download", false);
            options.AddUserProfilePreference("safebrowsing.enabled", false);

            return options;
        }

        [HttpPost]
        public async Task<IActionResult> UploadImageAsync(IFormFile image)
        {
            // Process the uploaded image (save to disk, database, etc.)
            // Note: You should add additional validation, error handling, and security measures
            // Note: You should add additional validation, error handling, and security measures


            /*            var chromeOptions = new ChromeOptions();
                        chromeOptions.AddArguments("headless");*/


           
            /*            options.AddArgument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0");*/
            if (image != null && image.Length > 0)
            {
                /*string pathToDesigns = @"C:\Users\Gentrit\source\repos\Azon\react-app\src\designs\";

                string uploadPathToDesigns = Path.Combine(pathToDesigns, image.FileName);
                if (System.IO.File.Exists(uploadPathToDesigns))
                {
                    using (var fileStream = new FileStream(uploadPathToDesigns + Guid.NewGuid(), FileMode.Create))
                    {
                        await image.CopyToAsync(fileStream);
                    }
                }
                else
                {
                    using (var fileStream = new FileStream(uploadPathToDesigns, FileMode.Create))
                    {
                        await image.CopyToAsync(fileStream);
                    }
                }*/
                string chromeDriverPath = _hostingEnvironment.WebRootPath;
                string credentialPath = Path.Combine(_hostingEnvironment.WebRootPath, "optical-metric-411818-b3e4d1c73897.json");
                /* GoogleCredential googleCredential = GoogleCredential.FromFile(credentialPath);
                 var client = StorageClient.Create(googleCredential);
                 byte[] byteArray;
                 using (MemoryStream memoryStream = new MemoryStream())
                 {
                     image.CopyTo(memoryStream);

                     // Convert MemoryStream to byte array
                     byteArray = memoryStream.ToArray();
                 }

                 var obj = await client.UploadObjectAsync("azondesigns", image.FileName,image.ContentType,new MemoryStream(byteArray));*/

                try
                {


                    using (_webDriver)
                    {
                       
                        GoogleCredential googleCredential = GoogleCredential.FromFile(credentialPath);
                        var client = StorageClient.Create(googleCredential);
                        byte[] byteArray;
                        using (MemoryStream memoryStream = new MemoryStream())
                        {
                            image.CopyTo(memoryStream);

                            // Convert MemoryStream to byte array
                            byteArray = memoryStream.ToArray();
                        }

                        var obj = await client.UploadObjectAsync("azondesigns", image.FileName + Guid.NewGuid(), image.ContentType, new MemoryStream(byteArray));
                        /*
                                                _webDriver.Navigate().GoToUrl("https://photoscissors.com");
                                                Thread.Sleep(3000);


                                                IWebElement fileInput = FindHiddenElementById(_webDriver, ".dz-hidden-input");


                                                fileInput.SendKeys(uploadPath);
                                                Thread.Sleep(4000);
                                                IWebElement download = FindDownloadButton(_webDriver);
                                                download.Click();
                                                Thread.Sleep(3000);
                                                IWebElement downloadRes = FindDownloadResButton(_webDriver);
                                                downloadRes.Click();
                                                Thread.Sleep(3000);



                                                string expectedFileName = "result.png";


                                                string downloadPath = Path.Combine(downloadsFolder, expectedFileName);
                        */

                        string filePath = Path.Combine(_hostingEnvironment.WebRootPath,image.FileName);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(fileStream);
                        }


                        if (System.IO.File.Exists(filePath))
                        {
                            /*FileResult pnImage =  PhysicalFile(downloadPath, "application/octet-stream", enableRangeProcessing: true);*/
                            _webDriver.Navigate().GoToUrl("https://www.vectorizer.io");
                            Thread.Sleep(2000);
                            IWebElement vectorizerInput = FindHiddenElementById(_webDriver, "#file");
                            vectorizerInput.SendKeys(filePath);
                            Thread.Sleep(7000);

                            IJavaScriptExecutor js = (IJavaScriptExecutor)_webDriver;
                            WebDriverWait wait = new WebDriverWait(_webDriver, TimeSpan.FromSeconds(10));
   

                            Thread.Sleep(4000);
                            // Use JavaScript to find the element even if it's hidden
                            IWebElement filledLayers = wait.Until(d => (IWebElement)js.ExecuteScript("return document.querySelector('button[name=\"algorithm\"][value=\"4\"]');"));
                            filledLayers.Click();
                            Thread.Sleep(4000);
                            try
                            {
                                IWebElement colors = wait.Until(d => (IWebElement)js.ExecuteScript("return document.querySelector('input[name=\"colors\"][title=\"4\"]');"));
                                colors.Click();
                                Thread.Sleep(2000);
                            }
                            catch (WebDriverTimeoutException ex)
                            {
                            }
                            IWebElement semanticSegmentationTab = (IWebElement)((IJavaScriptExecutor)_webDriver).ExecuteScript("return document.querySelector('#semanticsegmentationtabbtn.nav-link');");

                            // Check if the display property is set to "none" using JavaScript
                            bool isObjectsDisplayNone = (bool)((IJavaScriptExecutor)_webDriver).ExecuteScript("return window.getComputedStyle(arguments[0]).display === 'none';", semanticSegmentationTab);
                            if (isObjectsDisplayNone)
                            {
                                IWebElement backgroundTabBtn = (IWebElement)((IJavaScriptExecutor)_webDriver).ExecuteScript("return document.getElementById('backgroundtabbtn');");

                                // Click on the element
                                backgroundTabBtn.Click();
                                IWebElement background = wait.Until(d => (IWebElement)js.ExecuteScript("return document.querySelector('input[name=\"bgremoveborder\"]');"));

                                // Toggle the checked property using JavaScript
                                js.ExecuteScript("arguments[0].checked = !arguments[0].checked;", background);
                        

                                ReadOnlyCollection<IWebElement> saveBackButtons = (ReadOnlyCollection<IWebElement>)js.ExecuteScript("return document.querySelectorAll('.btn.btn-primary.btn-sm.save');");
                                saveBackButtons[1].Click();
                                Thread.Sleep(3000);
                            }
                            else
                            {
                                semanticSegmentationTab.Click();
                                Thread.Sleep(2000);
                                int maxCheckboxCount = 4; // You can adjust this based on your requirements
                                bool checkboxFound = false;

                                for (int counter = 0; counter < maxCheckboxCount; counter++)
                                {
                                    string checkboxName = $"so{counter}";

                                    try
                                    {
                                        IWebElement checkbox = wait.Until(d => (IWebElement)((IJavaScriptExecutor)d).ExecuteScript($"return document.querySelector('input[type=checkbox][name={checkboxName}]');"));

                                        if (checkbox != null)
                                        {
                                            checkbox.Click();
                                            ReadOnlyCollection<IWebElement> saveButtons = _webDriver.FindElements(By.CssSelector("button.save.btn.btn-sm.btn-primary"));
                                            saveButtons[1].Click();
                                            Thread.Sleep(2000);
                                        }
                                        else
                                        {
                                            // Set the flag to false and break out of the loop
                    
                                            break;
                                        }
                                        checkboxFound = true;
             

                                        // Click on the canvas
                                       
                                    }
                                    catch (Exception ex)
                                    {
                                        // Handle the exception if needed
                                        Console.WriteLine(ex.Message);
                                        /*checkboxFound = false;*/
                                        break;
                                    }
                                }

                              
                               
                            }
                            IWebElement canvas = wait.Until(d => (IWebElement)((IJavaScriptExecutor)d).ExecuteScript("return document.getElementById('inputcanvas');"));
                            Actions builder = new Actions(_webDriver);
                            builder.MoveToElement(canvas).Click().Perform();
                            WebDriverWait wait1 = new WebDriverWait(_webDriver, TimeSpan.FromSeconds(100));
                            string targetClass = "img-fluid";
                            Thread.Sleep(5000);
                            bool isDisplayNone = wait1.Until(d =>
                            {
                                IReadOnlyCollection<IWebElement> elements = d.FindElements(By.CssSelector($"div.progress"));

                                if (elements.Count > 0)
                                {
                                    IWebElement firstElement = elements.First();
                                    return firstElement.GetCssValue("display").Equals("none", StringComparison.OrdinalIgnoreCase);
                                }

                                // If no elements found, consider it as if it's already invisible
                                return true;
                            });
                            if (isDisplayNone)
                            {

                                var svgElement = wait.Until(d => d.FindElement(By.CssSelector($"svg.{targetClass}")));

                                System.IO.File.Delete(filePath);

                                if (svgElement != null)
                                {
                                    var innerHtml = svgElement.GetAttribute("innerHTML");
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
                                return NotFound();
                            }
                           




                        }

                        else
                        {
                            return BadRequest(new { Message = "Image Not Found" });
                        }



                    }
                }catch (Exception ex)
                {
                    return BadRequest(new { Message = ex});
                }
                
            }
            else
            {
                return BadRequest(new { Message = "Invalid image file" });
            }
            
        }



        private IWebDriver GetDriverAsync(ChromeOptions options)
        {
/*            var driverPath = "C:\\home\\site\\wwwroot\\chromedriver\\win64\\120.0.6099.109";*/
            return new ChromeDriver(options);
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



    }
}
