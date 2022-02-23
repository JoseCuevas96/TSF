using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using WebApi.DTOs;
using WebApi.Models;

namespace WebApi.Data
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<Class, ClassDTO>();
        }
    }
}
