using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Class
    {
        [Key]
        public int IdClass { get; set; }
        public int IdClassName { get; set; }
        public int IdClassLocation { get; set; }
        public DateTime Schedule { get; set; }
        public int MaxStudents { get; set; }
        public string StartTime { get; set; }
        public string FinishTime { get; set; }
        public float RegisterCost { get; set; }
        public bool Enabled { get; set; }
        public bool Spanish { get; set; }
        public Instructor instructor { get; set; }
        public string Note { get; set; }
        public string SearchKey { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
