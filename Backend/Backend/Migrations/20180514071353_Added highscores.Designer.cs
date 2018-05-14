﻿// <auto-generated />
using Backend.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace Backend.Migrations
{
    [DbContext(typeof(BoggleDbContext))]
    [Migration("20180514071353_Added highscores")]
    partial class Addedhighscores
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn)
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011");

            modelBuilder.Entity("Backend.Models.BoardState", b =>
                {
                    b.Property<Guid>("StateId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BoardAsString");

                    b.Property<int>("Score");

                    b.Property<double>("TimeCreated");

                    b.HasKey("StateId");

                    b.ToTable("BoardStates");
                });

            modelBuilder.Entity("Backend.Models.Highscore", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int>("Score");

                    b.HasKey("Id");

                    b.ToTable("Highscores");
                });

            modelBuilder.Entity("Backend.Models.WordEntry", b =>
                {
                    b.Property<Guid>("WordId")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("BoardId");

                    b.Property<string>("LetterOrderAsString");

                    b.Property<string>("Word")
                        .IsRequired();

                    b.HasKey("WordId");

                    b.HasIndex("BoardId");

                    b.ToTable("Words");
                });

            modelBuilder.Entity("Backend.Models.WordEntry", b =>
                {
                    b.HasOne("Backend.Models.BoardState", "BoardState")
                        .WithMany("Words")
                        .HasForeignKey("BoardId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
