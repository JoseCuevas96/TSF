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
    [Route("api/Instructor")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public class InstructorController : Controller
    {
        Instructors Business = new Instructors();
        private readonly IMapper _mapper;

        public InstructorController(IMapper mapper)
        {
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getInstructors")]
        public async Task<response> getInstructors(string IdLocation)
        {
            response response = new response();
            List<Instructor> locations = _mapper.Map<List<Instructor>>(Business.getInstructors(IdLocation));

            response.Success = "OK";
            response.statusCode = HttpStatusCode.OK;
            response.Message = locations;

            return await Task.FromResult(response);
        }

        [HttpPost]
        [Route("insertInstructor")]
        public async Task<response> insertInstructor(Instructor instructor)
        {
            response response = new response();
            Business.insertInstructor(instructor);

            response.Success = "Ok";
            response.statusCode = HttpStatusCode.OK;
            response.Message = "Ok";

            return await Task.FromResult(response);
        }

        [HttpPost]
        [Route("updateInstructor")]
        public async Task<response> updateInstructor(Instructor instructor)
        {
            response response = new response();
            Business.updateInstructor(instructor);

            response.Success = "Ok";
            response.statusCode = HttpStatusCode.OK;
            response.Message = "Ok";

            return await Task.FromResult(response);
        }

        [HttpPost]
        [Route("deleteInstructor")]
        public async Task<response> deleteInstructor(Instructor instructor)
        {
            response response = new response();
            Business.deleteInstructor(instructor);

            response.Success = "Ok";
            response.statusCode = HttpStatusCode.OK;
            response.Message = "Ok";

            return await Task.FromResult(response);
        }
    }
}
