using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace DAL.Repository
{
    public class Repository<T> : IRepository<T> where T : class, new()
    {
        private readonly DbContext context;
        private readonly DbSet<T> entities;

        public Repository(Context context)
        {
            this.context = context;
            this.entities = context.Set<T>();
        }

        public IQueryable<T> All(params Expression<Func<T, object>>[] includeExpressions)
        {
            return this.All(false, includeExpressions);
        }

        public IQueryable<T> All(bool includeInactive, params Expression<Func<T, object>>[] includeExpressions)
        {
            IQueryable<T> set = this.entities;

            foreach (var includeExpression in includeExpressions)
            {
                set = set.Include(includeExpression);
            }

            return set;
        }

        public IQueryable<T> GetAll()
        {
            IQueryable<T> set = this.entities;
            return set;
        }

        public T GetById(object id)
        {
            return this.entities.Find(id);
        }

        public bool Exists(T entity)
            => this.entities.Contains(entity);

        public T Add(T entity)
        {
            return this.entities.Add(entity).Entity;
        }

        public void ChangeState(T entity, EntityState state)
        {
            var entry = this.context.Entry(entity);

            if (entry.State == EntityState.Detached)
            {
                this.entities.Attach(entity);
            }

            entry.State = state;
        }

        public T Save(T entity)
        {
            this.ChangeState(entity, EntityState.Modified);

            this.Save();
            return entity;
        }

        public void Save()
        {
            this.context.SaveChanges();
        }

        public void Delete(T entity)
        {
            this.entities.Remove(entity);

            this.Save();
        }

        public void Delete(object id)
        {
            var entity = this.entities.Find(id);

            this.entities.Remove(entity);

            this.Save();
        }
    }
}
