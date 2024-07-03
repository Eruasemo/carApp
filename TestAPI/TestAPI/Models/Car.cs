using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace TestAPI.Models
{
    public class Car
    {
        
        public int Id { get; set; }
        [Required] public int Year { get; set; }
        [Required] public string Model { get; set; }
        
        [Required] public string Brand { get; set; }
    }
}
