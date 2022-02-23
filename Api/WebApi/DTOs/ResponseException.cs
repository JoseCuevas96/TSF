using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace WebApi.DTOs
{
    public class ResponseException
    {

        public string ResponseCode { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public string Mensaje { get; set; }
        public string StackTrace { get; set; } 
        public bool Success { get; set; }
    }
}
