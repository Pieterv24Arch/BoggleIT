using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database
{
    public class BoggleDbContext : DbContext
    {
        public DbSet<BoardState> BoardStates { get; set; }

        public BoggleDbContext(DbContextOptions<BoggleDbContext> options): base(options)
        {
        }
    }
}
