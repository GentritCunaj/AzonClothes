# .NET Web API and ReactJS Project
Project Overview
Welcome to AzonClothes ! This project aims to create a fully functional and user-friendly ecommerce platform. 
It provides a platform for customers to browse products, make purchases, and manage their accounts efficiently. This README will guide you through the setup and usage of our ecommerce application.



## Features
User authentication:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Users can sign up, log in, and manage their accounts securely.  
Product browsing:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Customers can browse through a wide range of products available on the platform.  
Product search:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Users can search for specific products using keywords.  
Product filtering:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Users can filter products by price.  
Products:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Items have various ranges of colors,sizes and quantities.  
Design:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Users can add a image of their preference and it will create a mockup of the hoodie.  
Shopping cart:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Customers can add products to their shopping cart for easy checkout.  
Checkout process:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Seamless checkout process with card payment and pay on delivery.  
Shipping Details:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Users can get their current location and fill shipping details quickly.  
Order management:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Users can view their order history and track their progress.  
User Profile:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Users can edit their info and update their saved shipping info.  
Admin panel:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Admin can manage products, orders and users.  
### Route protected:  
  Admin Pages  
  One users orders cant be accesses by another user  

### Backend Features:   
Not registered users automatically get deleted after a order  
Products quantity minimizes for each order   



## Technologies Used  
Frontend: HTML, CSS, JavaScript, ReactJs,React-Redux  
Backend: .NET Web API, C#, Entity Framework Core, SQL Server,  
Authentication: JSON Web Tokens (JWT)  
Payment: Stripe API  
Deployment: Azure  
Installation  
Clone the repository:  
git clone https://github.com/GentritCunaj/AzonClothes.git  

# Frontend   
cd react-app  
Install dependencies :   
npm install  
Create a .env file in the root directory.  
Add necessary environment variables such as database connection URL, JWT secret, Stripe API keys, etc.  
Start the development server:  
npm start  
## Usage  
Access the application through your browser at http://localhost:3000.  
Sign up for a new account or log in if you already have one.  
Browse through available products, add them to your cart, and proceed to checkout.  
Fill in the necessary information and select a payment method to complete the purchase.  
As an admin, log in with admin credentials to access the admin panel and manage products, categories, orders, and user accounts.  

# Backend  
cd Azon  
Install necessary NuGet packages:  

Open the solution file (.sln) in Visual Studio.  
Right-click on the project and select "Manage NuGet Packages..."  
Install the required packages such as Entity Framework Core, Newtonsoft.Json, etc.  
Set up database connection:  
Modify the appsettings.json file to include your database connection string.  
Apply database migrations:  
Open Package Manager Console in Visual Studio.  
Run the following command to apply migrations and create/update the database:  
Open Package Manager Console  
dotnet ef database update  
Set up environment variables:  

Add necessary environment variables such as JWT secret, Stripe API keys, etc. You can set these in the appsettings.json file.  
Start the application:  
Press F5 or click on the "Start" button in Visual Studio to run the application.  
## Usage  
Access the application through your browser at http://localhost:7247.  
Access the API endpoints through your preferred HTTP client (e.g., Postman, Swagger UI).  
Register for a new account or log in if you already have one.  
Browse through available products, add them to your cart, and proceed to checkout.  
Fill in the necessary information and select a payment method to complete the purchase.  
As an admin, you can access admin functionalities through designated endpoints to manage products, categories, orders, and user accounts.  

# Watch how the application runs from a logged in user
[![Watch the video](https://i.stack.imgur.com/Vp2cE.png)](https://www.youtube.com/watch?v=QLwds44fhKw)

# Watch how the admin panel looks in the application
[![Watch the video](https://i.stack.imgur.com/Vp2cE.png)](https://www.youtube.com/watch?v=kqiANfEECUE)

# Watch how the application looks in a mobile device 
[![Watch the video](https://i.stack.imgur.com/Vp2cE.png)](https://www.youtube.com/watch?v=hL4WHDskJ1o)




# Contributing  
To contribute, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/xyz).
Make your changes.
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/xyz).
Create a new Pull Request.

# Contact  
## For any inquiries or feedback, please contact me at qunajgentrit@gmail.com  

## Thank you for using AzonClothes! Happy shopping! 🛒🎉

