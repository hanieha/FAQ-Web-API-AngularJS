using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Web;
using System.Data.Entity.Core.EntityClient;
using System.Data.Common;

namespace Web_Api_1.Models
{
    public class Question
    {
        [Key]
        public int Qid { get; set; }
        //Customer Id 
        public int Cid { get; set; }
        public string  Qtext { get; set; }

        //public virtual Answer Answer { get; set; }
    }

    public class Answer
    {
        [Key]
        public int Aid { get; set; }
        public int Qid { get; set; }
        public string Atext { get; set; }

        public virtual List<Question> questions { get; set; }
    }

    public class QAContext : DbContext
    {
        public QAContext()
            : base("name=QA")
        {
            Database.CreateIfNotExists();
        }

        // konstruktøren under brukes kun under test!
        public QAContext(DbConnection connection)
                : base(connection,true)
        {
        }
      
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }


}