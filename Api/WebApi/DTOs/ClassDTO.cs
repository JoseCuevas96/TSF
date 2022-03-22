using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.DTOs
{
    public class ClassDTO
    {
        public int IdClass { get; set; }
        public int IdClassName { get; set; }
        public string ClassName { get; set; }
        public int IdClassLocation { get; set; }
        public string ClassLocation { get; set; }
        public DateTime Schedule { get; set; }
        public int MaxStudents { get; set; }
        //public TimeSpan StartTime { get; set; }
        //public TimeSpan FinishTime { get; set; }
        public string StartTime { get; set; }
        public string FinishTime { get; set; }
        public float RegisterCost { get; set; }
        public bool Enabled { get; set; }
        public bool Spanish { get; set; }
        public int IdInstructor { get; set; }
        public string Instructor { get; set; }
        public string Note { get; set; }
        public string SearchKey { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
