using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Validations;
using WebApi.Models;
using WebApi.Data;

namespace WebApi.Business
{
    public class ClassLocations
    {
        public ClassValidations Validate = new ClassValidations();

        public List<ClassLocation> GetClassLocations(string IdLocation, string Name, string Address, string City, string State, string ZIP)
        {
            using (var context = new ApplicationDBContext())
            {
                try
                {
                    IdLocation = (IdLocation == null ? "0" : IdLocation);
                    int id = Convert.ToInt32(IdLocation.Trim());
                    if (id != 0)
                    {
                        return context.ClassLocation.Where(x => x.IdLocation == id).ToList();
                    }
                    else
                    {
                        return context.ClassLocation.ToList();
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }

        public void InsertClassLocation(ClassLocation myClassLocation)
        {
            using (var context = new ApplicationDBContext())
            {
                try
                {
                    ClassLocation classLocation = new ClassLocation();
                    classLocation.Name = myClassLocation.Name;
                    classLocation.Address = myClassLocation.Address;
                    classLocation.City = myClassLocation.City;
                    classLocation.State = myClassLocation.State;
                    classLocation.ZIP = myClassLocation.ZIP;

                    context.ClassLocation.Add(classLocation);
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }

        public void UpdateClassLocation(ClassLocation myClassLocation)
        {
            using (var context = new ApplicationDBContext())
            {
                try
                {
                    ClassLocation classLocation = context.ClassLocation.Find(myClassLocation.IdLocation);
                    classLocation.Name = myClassLocation.Name;
                    classLocation.Address = myClassLocation.Address;
                    classLocation.City = myClassLocation.City;
                    classLocation.State = myClassLocation.State;
                    classLocation.ZIP = myClassLocation.ZIP;

                    context.Entry(classLocation).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }

        public void DeleteClassLocation(ClassLocation myClassLocation)
        {
            using (var context = new ApplicationDBContext())
            {
                try
                {
                    ClassLocation classLocation = context.ClassLocation.Find(myClassLocation.IdLocation);
                    context.ClassLocation.Remove(classLocation);
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }

    }
}
