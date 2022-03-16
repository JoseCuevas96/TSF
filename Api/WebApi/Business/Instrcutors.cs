using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Validations;
using WebApi.Models;
using WebApi.Data;

namespace WebApi.Business
{
    public class Instructors
    {

        public List<Instructor> getInstructors(string Id)
        {
            using (var context = new ApplicationDBContext())
            {
                try
                {
                    Id = (Id == null ? "0" : Id);
                    if (Id != "0")
                    {
                        return context.Instructors.Where(x => x.IdInstructor == Id).ToList();
                    }
                    else
                    {
                        return context.Instructors.ToList();
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }

        public void insertInstructor(Instructor instructor)
        {
            using (var context = new ApplicationDBContext())
            {
                try
                {
                    context.Instructors.Add(instructor);
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }

        public void updateInstructor(Instructor instructorV)
        {
            using (var context = new ApplicationDBContext())
            {
                try
                {
                    Instructor instructor = context.Instructors.Find(instructorV.Id);
                    instructor.Name = instructorV.Name;
                    instructor.IdInstructor = instructorV.IdInstructor;

                    context.Entry(instructor).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }

        public void deleteInstructor(Instructor instructorV)
        {
            using (var context = new ApplicationDBContext())
            {
                try
                {
                    Instructor instructor = context.Instructors.Find(instructorV.Id);
                    context.Instructors.Remove(instructor);
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
