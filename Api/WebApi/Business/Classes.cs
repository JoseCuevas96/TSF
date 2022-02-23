using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Data;
using WebApi.DTOs;
using WebApi.Models;
using WebApi.Validations;

namespace WebApi.Business
{

    public class Classes
    {
        public ClassValidations Validate = new ClassValidations();

        public List<Class> GetClasses(string IdType, string Month, string IdLocation, string IdClass, string From, string To, string SearchKey)
        {
            using (var context = new ApplicationDBContext())
            {
                try
                {

                int idType = Convert.ToInt32(IdType);
                int month = Convert.ToInt32(Month);
                int idLocation = Convert.ToInt32(IdLocation);

                if (SearchKey == "Browser")
                {
                    return context.Classes.Where(x => x.IdClassName == idType && x.Schedule.Month == month && x.IdClassLocation == idLocation).ToList();
                }
                else if (IdClass != null)
                {
                    return context.Classes.Where(x => x.IdClass == Convert.ToInt32(IdClass)).ToList();
                }
                else if (!string.IsNullOrEmpty(From) && !string.IsNullOrEmpty(To))
                {
                    DateTime from = Convert.ToDateTime(From);
                    DateTime to = Convert.ToDateTime(To);
                    return context.Classes.Where(x => x.Schedule >= from && x.Schedule <= to).ToList();
                }
                else if (!string.IsNullOrEmpty(SearchKey) && SearchKey != "Browser")
                {
                    return context.Classes.Where(x => x.SearchKey == SearchKey).ToList();

                }
                else
                {
                    return context.Classes.ToList();
                }

                }
                catch (Exception ex)
                {
                    throw new Exceptions(ex.Message);
                }
            }

        }
    }
}
