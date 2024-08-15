USE [master]
GO
/****** Object:  Database [BibliotecaDB]    Script Date: 8/15/2024 1:04:00 AM ******/
CREATE DATABASE [BibliotecaDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BibliotecaDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\BibliotecaDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'BibliotecaDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\BibliotecaDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [BibliotecaDB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BibliotecaDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BibliotecaDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BibliotecaDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BibliotecaDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BibliotecaDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BibliotecaDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [BibliotecaDB] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [BibliotecaDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BibliotecaDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BibliotecaDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BibliotecaDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BibliotecaDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BibliotecaDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BibliotecaDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BibliotecaDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BibliotecaDB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [BibliotecaDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BibliotecaDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BibliotecaDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BibliotecaDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BibliotecaDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BibliotecaDB] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [BibliotecaDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BibliotecaDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [BibliotecaDB] SET  MULTI_USER 
GO
ALTER DATABASE [BibliotecaDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BibliotecaDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BibliotecaDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BibliotecaDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [BibliotecaDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [BibliotecaDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [BibliotecaDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [BibliotecaDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [BibliotecaDB]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 8/15/2024 1:04:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Books]    Script Date: 8/15/2024 1:04:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Books](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](max) NOT NULL,
	[Author] [nvarchar](max) NOT NULL,
	[Category] [nvarchar](max) NOT NULL,
	[ISBN] [nvarchar](max) NOT NULL,
	[PublishedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Books] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Loans]    Script Date: 8/15/2024 1:04:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Loans](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[BookId] [int] NOT NULL,
	[BorrowerName] [nvarchar](max) NOT NULL,
	[BorrowDate] [datetime2](7) NOT NULL,
	[ReturnDate] [datetime2](7) NULL,
 CONSTRAINT [PK_Loans] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Members]    Script Date: 8/15/2024 1:04:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Members](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[Tel] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Members] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [BibliotecaDB] SET  READ_WRITE 
GO
