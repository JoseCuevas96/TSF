using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WebApi.DTOs;

namespace WebApi.Controllers
{
    [ApiController]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class GlobalErrorsController : ControllerBase
    {
        private readonly ILogger<GlobalErrorsController> _logger;

        public GlobalErrorsController(ILogger<GlobalErrorsController> logger)
        {
            _logger = logger;
        }
        [HttpGet]
        [Route("/errors")]
        public ActionResult<ResponseException> HandleErrors()
        {
            var contextException = HttpContext.Features.Get<IExceptionHandlerFeature>();

            var responseStatusCode = contextException.Error.GetType().Name switch
            {
                "NullReferenceException" => HttpStatusCode.BadRequest,
                _ => HttpStatusCode.ServiceUnavailable
            };

            if (contextException.Error is Exceptions exceptions)
            {
                //Excepciones controladas
                ResponseException oResponse = new ResponseException();
                oResponse.Success = false;
                oResponse.ResponseCode = "Controlled";
                oResponse.Mensaje = exceptions.Mensaje;
                oResponse.StatusCode = HttpStatusCode.BadRequest;
                //oResponse.StackTrace = exceptions.StackTrace;
                return oResponse;
            }
            else
            {
               //Excepciones No controladas
                ResponseException oResponse = new ResponseException();
                oResponse.Success = false;
                oResponse.ResponseCode = "Uncontrolled";
                oResponse.Mensaje = "An unhandled exception was raised, call technical support.";
                oResponse.StatusCode = responseStatusCode;
                //oResponse.StackTrace = contextException.Error.StackTrace;
                //_logger.LogError("Uncontrolled. Error: " + oResponse.Mensaje + ". Stack Trace: " + oResponse.StackTrace);
                return oResponse;
            }
        }
    }
}
