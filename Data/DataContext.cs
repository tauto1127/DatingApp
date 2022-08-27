using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)//絶対に必要
        {
        }

        public DbSet<AppUser> Users { get; set; }
    }
}