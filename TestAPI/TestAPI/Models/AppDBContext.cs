using Microsoft.EntityFrameworkCore;
using TestAPI.Controllers;

namespace TestAPI.Models
{
    public class AppDBContext :DbContext    
    {
        public DbSet<Car> Car { get; set; }
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {

        }
    }
}
