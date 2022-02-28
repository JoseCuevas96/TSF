using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Data;
using WebApi.DTOs;
using WebApi.Models;
using WebApi.Validations;

namespace WebApi.Business
{
    public class ClassTypes
    {
        public ClassValidations Validate = new ClassValidations();

        public List<ClassType> getClassTypes(string IdType, string TypeName)
        {
            using (var context = new ApplicationDBContext())
            {
                try
                {
                    IdType = (IdType == null ? "0" : IdType);
                    TypeName = (TypeName == null ? "" : TypeName);

                    int id = Convert.ToInt32(IdType.Trim());

                    if (id != 0)
                    {
                        return context.ClassType.Where(x => x.IdType == id).ToList();
                    }
                    else if (!string.IsNullOrEmpty(TypeName))
                    {
                        return context.ClassType.Where(x => x.TypeName == TypeName.Trim()).ToList();
                    }
                    else
                    {
                        return context.ClassType.ToList();
                    }
                }
                catch (Exception ex)
                {
                    throw new Exceptions(ex.Message);
                }
            }
        }

        public void InsertClassType(ClassType miClassType)
        {
            using (var context = new ApplicationDBContext())
            {
                try
                {
                    ClassType classType = new ClassType();
                    classType.TypeName = miClassType.TypeName.Trim();

                    context.ClassType.Add(classType);
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exceptions(ex.Message);
                }
            }
        }

        public void UpdateClassType(ClassType miClassType)
        {
            using (var context = new ApplicationDBContext())
            {
                try
                {
                    ClassType classType = context.ClassType.Find(miClassType.IdType);
                    classType.TypeName = miClassType.TypeName.Trim();

                    context.Entry(classType).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exceptions(ex.Message);
                }
            }
        }

        public void DeleteClassType(ClassType miClassType)
        {
            using (var context = new ApplicationDBContext())
            {
                try
                {
                    ClassType classType = context.ClassType.Find(miClassType.IdType);
                    context.ClassType.Remove(classType);

                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exceptions(ex.Message);
                }
            }
        }
    }
}
