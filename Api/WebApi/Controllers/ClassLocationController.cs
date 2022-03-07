using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WebApi.Business;
using WebApi.DTOs;
using WebApi.Models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/Classes")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public class ClassLocationController : Controller
    {
        ClassLocations ClassLocationBusiness = new ClassLocations();
        private readonly IMapper _mapper;

        public ClassLocationController(IMapper mapper)
        {
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getClassLocations")]
        public async Task<response> getClassLocations(string IdLocation)
        {
            response response = new response();
            List<ClassLocation> locations = _mapper.Map<List<ClassLocation>>(ClassLocationBusiness.GetClassLocations(IdLocation));

            response.Success = "OK";
            response.statusCode = HttpStatusCode.OK;
            response.Message = locations;

            return await Task.FromResult(response);
        }

        [HttpPost]
        [Route("insertClassLocation")]
        public async Task<response> insertClassLocation(ClassLocation myClassLocation)
        {
            response response = new response();
            ClassLocationBusiness.InsertClassLocation(myClassLocation);

            response.Success = "Ok";
            response.statusCode = HttpStatusCode.OK;
            response.Message = "Ok";

            return await Task.FromResult(response);
        }

        [HttpPost]
        [Route("updateClassLocation")]
        public async Task<response> updateClassLocation(ClassLocation myClassLocation)
        {
            response response = new response();
            ClassLocationBusiness.UpdateClassLocation(myClassLocation);

            response.Success = "Ok";
            response.statusCode = HttpStatusCode.OK;
            response.Message = "Ok";

            return await Task.FromResult(response);
        }

        [HttpPost]
        [Route("deleteClassLocation")]
        public async Task<response> deleteClassLocation(ClassLocation myClassLocation)
        {
            response response = new response();
            ClassLocationBusiness.DeleteClassLocation(myClassLocation);

            response.Success = "Ok";
            response.statusCode = HttpStatusCode.OK;
            response.Message = "Ok";

            return await Task.FromResult(response);
        }

    }
}
