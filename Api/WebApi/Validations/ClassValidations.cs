using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Validations
{
    public class ClassValidations
    {
        public bool IsNumber(string value) {
            int numericValue;
            if (int.TryParse(value, out numericValue))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
