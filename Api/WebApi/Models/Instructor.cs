﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Instructor
    {
        [Key]
        public int IdInstructor { get; set; }
        public string Name { get; set; }
    }
}
