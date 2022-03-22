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

        public List<ClassDTO> GetClasses(string IdType, string Month, string IdLocation, string IdClass, string From, string To, string SearchKey)
        {
            List<ClassDTO> classes = new List<ClassDTO>();
            using (var context = new ApplicationDBContext())
            {
                try
                {
                    
                    int idType = Convert.ToInt32(IdType);
                    int month = Convert.ToInt32(Month);
                    int idLocation = Convert.ToInt32(IdLocation);

                    //if (SearchKey == "Browser")
                    //{
                    //    return context.Classes.Where(x => x.IdClassName == idType && x.Schedule.Month == month && x.IdClassLocation == idLocation).ToList();
                    //}
                    //else if (IdClass != null)
                    //{
                    //    return context.Classes.Where(x => x.IdClass == Convert.ToInt32(IdClass)).ToList();
                    //}
                    //else if (!string.IsNullOrEmpty(From) && !string.IsNullOrEmpty(To))
                    //{
                    //    DateTime from = Convert.ToDateTime(From);
                    //    DateTime to = Convert.ToDateTime(To);
                    //    return context.Classes.Where(x => x.Schedule >= from && x.Schedule <= to).ToList();
                    //}
                    //else if (!string.IsNullOrEmpty(SearchKey) && SearchKey != "Browser")
                    //{
                    //    return context.Classes.Where(x => x.SearchKey == SearchKey).ToList();

                    //}
                    //else
                    //{
                    //    //return context.Classes.ToList();
                    //    classes = (from c in context.Classes
                    //                join ct in context.ClassType on c.IdClassName equals ct.IdType
                    //                select c).ToList();
                    //}


                    //classes = context.Classes
                    //    .Join(
                    //        context.ClassType,
                    //        c => c.IdClassName,
                    //        ct => ct.IdType,
                    //        (c, ct) => new {c, ct}
                    //    )
                    //    .Join(
                    //        context.ClassLocation,
                    //        o => o.c.IdClassLocation,
                    //        cl => cl.IdLocation,
                    //        (o, cl) => new {o, cl}
                    //    )
                    //    .Join(
                    //        context.Instructors,
                    //        o => o.o.c.instructorId,
                    //        ins => ins.IdInstructor,
                    //        (o, ins) => new { o, ins }
                    //    )
                    //    .Select(r => new ClassDTO
                    //    {
                    //        IdClass = r.IdClass,
                    //        IdClassName = r.IdClassName,
                    //        ClassName = r.TypeName,
                    //        IdClassLocation = r.IdClassLocation,
                    //        ClassLocation = r.Name,
                    //        Schedule = r.Schedule,
                    //        MaxStudents = r.MaxStudents,
                    //        StartTime = r.StartTime,
                    //        FinishTime = r.FinishTime,
                    //        RegisterCost = r.RegisterCost,
                    //        Enabled = r.Enabled,
                    //        Spanish = r.Spanish,
                    //        IdInstructor = r.instructorId,
                    //        Instructor = r.Instructor,
                    //        Note = r.Note,
                    //        SearchKey = r.SearchKey,
                    //        CreateDate = r.CreateDate
                    //    }).ToList();

                    classes = (
                        from c in context.Classes
                        join ct in context.ClassType on c.IdClassName equals ct.IdType
                        join cl in context.ClassLocation on c.IdClassLocation equals cl.IdLocation
                        select new ClassDTO
                        {
                            IdClass = c.IdClass,
                            IdClassName = c.IdClassName,
                            ClassName = ct.TypeName,
                            IdClassLocation = c.IdClassLocation,
                            ClassLocation = cl.Name,
                            Schedule = c.Schedule,
                            MaxStudents = c.MaxStudents,
                            StartTime = c.StartTime,
                            FinishTime = c.FinishTime,
                            RegisterCost = c.RegisterCost,
                            Enabled = c.Enabled,
                            Spanish = c.Spanish,
                            IdInstructor = c.instructorId,
                            Instructor = c.instructorId.ToString(),
                            Note = c.Note,
                            SearchKey = c.SearchKey,
                            CreateDate = c.CreateDate
                        }
                    ).ToList();

                    return classes;
                }
                catch (Exception ex)
                {
                    throw new Exceptions(ex.Message);
                }
            }

        }

        public void insertClasses(Class classes)
        {
            using (var context = new ApplicationDBContext())
            {
                try
                {
                    Class classe = new Class();
                    classe.IdClassName = classes.IdClassName;
                    classe.IdClassLocation = classes.IdClassLocation;
                    classe.Schedule = new DateTime(classes.Schedule.Year, classes.Schedule.Month, classes.Schedule.Day);
                    classe.MaxStudents = classes.MaxStudents;
                    classe.StartTime = classes.StartTime;
                    classe.FinishTime = classes.FinishTime;
                    classe.RegisterCost = classes.RegisterCost;
                    classe.Enabled = classes.Enabled;
                    classe.Spanish = classes.Spanish;
                    classe.instructorId = classes.instructorId;
                    classe.Note = classes.Note;
                    classe.SearchKey = classes.SearchKey;
                    classe.CreateDate = DateTime.Now;

                    context.Classes.Add(classe);
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }

        public void updateClass(Class classes)
        {
            using (var context = new ApplicationDBContext())
            {
                try
                {
                    Class cl = context.Classes.Find(classes.IdClass);
                    cl.IdClassName = classes.IdClassName;
                    cl.IdClassLocation = classes.IdClassLocation;
                    cl.Schedule = new DateTime(classes.Schedule.Year, classes.Schedule.Month, classes.Schedule.Day);
                    cl.MaxStudents = classes.MaxStudents;
                    cl.StartTime = classes.StartTime;
                    cl.FinishTime = classes.FinishTime;
                    cl.RegisterCost = classes.RegisterCost;
                    cl.Enabled = classes.Enabled;
                    cl.Spanish = classes.Spanish;
                    cl.instructorId = classes.instructorId;
                    cl.Note = classes.Note;
                    cl.SearchKey = classes.SearchKey;
                    cl.CreateDate = DateTime.Now;

                    context.Entry(cl).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }

        public void deleteClass(Class classes)
        {
            using (var context = new ApplicationDBContext())
            {
                try
                {
                    Class cl = context.Classes.Find(classes.IdClass);
                    context.Classes.Remove(cl);
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
