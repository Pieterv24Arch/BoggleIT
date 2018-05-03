using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

/*namespace Backend.Database
{
    public class DbContextFactory : IDesignTimeDbContextFactory<BoggleDbContext>
    {
        /// <summary>
        /// This class tells entity framework how to update the database when changes are made to it's structure.
        /// This class is used when 'Update-Database' is ran
        /// </summary>
        public BoggleDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<BoggleDbContext>();

            var connectionString = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=D:\\UserData\\Documents\\BoggleAPI\\BoggleAPI\\Database\\db.mdf;Integrated Security=True;Connect Timeout=30";
            var connectionMySql = "server=localhost;uid=root;pwd=Pieter1998;database=boggleDb";

            builder.UseMySql(connectionMySql);

            return new BoggleDbContext(builder.Options);
        }
    }
}*/
