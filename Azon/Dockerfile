FROM mcr.microsoft.com/dotnet/aspnet:8.0-jammy AS base
WORKDIR /app

# Update apt package list and upgrade existing packages
RUN apt update -y && apt upgrade -y 

# Install required packages
RUN apt install -y wget unzip dpkg

# Download and install Google Chrome
RUN wget http://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_114.0.5735.90-1_amd64.deb
RUN dpkg -i google-chrome-stable_114.0.5735.90-1_amd64.deb || apt-get install -f -y

# Download and install ChromeDriver
RUN wget https://chromedriver.storage.googleapis.com/114.0.5735.90/chromedriver_linux64.zip
RUN unzip chromedriver_linux64.zip
RUN mv chromedriver /usr/bin/chromedriver
RUN chown root:root /usr/bin/chromedriver
RUN chmod +x /usr/bin/chromedriver

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["Azon/Azon.csproj", "Azon/"]
RUN dotnet restore "Azon/Azon.csproj"
COPY . .
WORKDIR "/src/Azon"
RUN dotnet build "Azon.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Azon.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

EXPOSE 8080
EXPOSE 8081

ENTRYPOINT ["dotnet", "Azon.dll"]
