using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace WebApi.DTOs
{
    public class response
    {
        public HttpStatusCode statusCode { get; set; }
        public string Success { get; set; }
        public dynamic Message { get; set; }

    }
}
