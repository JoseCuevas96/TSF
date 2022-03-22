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
    public class ClassController : Controller
    {
        Classes ClassBusiness = new Classes();
        private readonly IMapper _mapper;
        public ClassController(IMapper mapper)
        {
            _mapper = mapper;
        }
        [HttpGet]
        [Route("GetClasses")]
        public async Task<response> GetClasses(string IdType, string Month, string IdLocation, string IdClass, string From, string To, string SearchKey)
        {
            response response = new response();
            List<ClassDTO> classes = _mapper.Map<List<ClassDTO>>(ClassBusiness.GetClasses(IdType,Month,IdLocation,IdClass,From,To,SearchKey));

            response.Success = "Ok";
            response.statusCode = HttpStatusCode.OK;
            response.Message = classes;

            return await Task.FromResult(response);

        }

        [HttpPost]
        [Route("insertClass")]
        public async Task<response> insertClass(Class classes)
        {
            response response = new response();
            ClassBusiness.insertClasses(classes);

            response.Success = "Ok";
            response.statusCode = HttpStatusCode.OK;
            response.Message = "Ok";

            return await Task.FromResult(response);
        }

        [HttpPost]
        [Route("updateClass")]
        public async Task<response> updateClass(Class classes)
        {
            response response = new response();
            ClassBusiness.updateClass(classes);

            response.Success = "Ok";
            response.statusCode = HttpStatusCode.OK;
            response.Message = "Ok";

            return await Task.FromResult(response);
        }

        [HttpPost]
        [Route("deleteClass")]
        public async Task<response> deleteClass(Class classes)
        {
            response response = new response();
            ClassBusiness.deleteClass(classes);

            response.Success = "Ok";
            response.statusCode = HttpStatusCode.OK;
            response.Message = "Ok";

            return await Task.FromResult(response);
        }
    }
}
