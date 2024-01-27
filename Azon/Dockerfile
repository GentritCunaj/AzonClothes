#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

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