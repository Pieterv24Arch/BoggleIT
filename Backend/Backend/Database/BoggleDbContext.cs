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
        public DbSet<WordEntry> Words { get; set; }

        public BoggleDbContext(DbContextOptions<BoggleDbContext> options) : base(options)
        {
            // this.Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define relation between GameState and WordEntry
            modelBuilder.Entity<WordEntry>()
                .HasOne(we => we.BoardState)
                .WithMany(gs => gs.Words)
                .HasForeignKey(we => we.BoardId);
        }
    }
}
