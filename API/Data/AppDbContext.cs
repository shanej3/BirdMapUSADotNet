using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }
    public DbSet<Bird> Birds { get; set; }
    public DbSet<UserBird> UserBirds { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserBird>()
            .HasKey(ub => new { ub.UserId, ub.SpeciesCode });

        modelBuilder.Entity<UserBird>()
            .HasOne(ub => ub.Bird)
            .WithMany(b => b.UserBirds)
            .HasForeignKey(ub => ub.SpeciesCode);

        // index for performance
        modelBuilder.Entity<UserBird>().HasIndex(ub => ub.UserId);

        // test seed data
        modelBuilder.Entity<AppUser>().HasData(
            new AppUser { Id = "bob-id", UserName = "Bob" },
            new AppUser { Id = "shane-id", UserName = "Shane" },
            new AppUser { Id = "john-id", UserName = "John" }
        );
    }
}
