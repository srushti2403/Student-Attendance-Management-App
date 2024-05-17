using Microsoft.EntityFrameworkCore;
using WebApplication1.Controllers;

namespace WebApplication1.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Teacher> Teachers { get; set; }

        public DbSet<Student> Students { get; set; }
        // Add DbSet properties for other entities if needed
    }
}
