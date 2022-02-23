using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.DTOs
{
    [Serializable]
    public class Exceptions : Exception
    {
        //Investigar system.diagnostics.compilation algo así obtbener el nombre del metodo del cual se llama un metodo
        //[System.Diagnostics.Compilation]
        public Exceptions(string message/*, string clase = null*/)
        {
            this.Mensaje = message;
            //this.clase = clase;
        }
        public string Mensaje { get; set; }
        //public string clase { get; set; }
    }
}
