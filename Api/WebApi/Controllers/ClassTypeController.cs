using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using WebApi.Business;
using WebApi.Data;
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
    public class ClassTypeController : Controller
    {
        ClassTypes ClassTypeBusiness = new ClassTypes();
        private readonly IMapper _mapper;

        public ClassTypeController(IMapper mapper)
        {
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getClassTypes")]
        public async Task<response> getClassTypes(string IdType, string TypeName)
        {
            response response = new response();
            List<ClassType> classes = _mapper.Map<List<ClassType>>(ClassTypeBusiness.getClassTypes(IdType, TypeName));

            response.Success = "Ok";
            response.statusCode = HttpStatusCode.OK;
            response.Message = classes;

            return await Task.FromResult(response);
        }

        [HttpPost]
        [Route("insertClassType")]
        public async Task<response> insertClassType(ClassType classType)
        {
            response response = new response();

            ClassTypeBusiness.InsertClassType(classType);

            response.Success = "Ok";
            response.statusCode = HttpStatusCode.OK;
            response.Message = "Ok";

            return await Task.FromResult(response);

        }

        [HttpPost]
        [Route("updateClassType")]
        public async Task<response> updateClassType(ClassType classType)
        {
            response response = new response();

            ClassTypeBusiness.UpdateClassType(classType);

            response.Success = "Ok";
            response.statusCode = HttpStatusCode.OK;
            response.Message = "Ok";

            return await Task.FromResult(response);

        }

        [HttpPost]
        [Route("deleteClassType")]
        public async Task<response> deleteClassType(ClassType classType)
        {
            response response = new response();

            ClassTypeBusiness.DeleteClassType(classType);

            response.Success = "Ok";
            response.statusCode = HttpStatusCode.OK;
            response.Message = "Ok";

            return await Task.FromResult(response);

        }
    }
}
