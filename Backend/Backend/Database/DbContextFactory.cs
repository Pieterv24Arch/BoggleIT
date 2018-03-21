using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Backend.Database
{
    public class DbContextFactory : IDesignTimeDbContextFactory<BoggleDbContext>
    {
        public BoggleDbContext CreateDbContext(string[] args)
        {
            string connectionString =
                "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=D:\\UserData\\Projects\\Boggle\\Backend\\Backend\\Database\\data.mdf;Integrated Security=True;Connect Timeout=30";

            DbContextOptionsBuilder<BoggleDbContext> optionsBuilder = new DbContextOptionsBuilder<BoggleDbContext>();

            optionsBuilder.UseSqlServer(connectionString);

            return new BoggleDbContext(optionsBuilder.Options);
        }
    }
}
