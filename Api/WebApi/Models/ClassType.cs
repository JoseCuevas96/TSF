using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class ClassType
    {
        [Key]
        public int IdType { get; set; }
        public string TypeName { get; set; }
    }
}
